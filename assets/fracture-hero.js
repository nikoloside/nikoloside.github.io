// DeepFracture hero — minimal, chrome-less fracture scene for the homepage.
// Click the model to shatter it (each click selects a different VQ-VAE
// codebook entry via the paper's collision embedding); it reassembles after
// a few seconds. Fragments are animated with a tiny hand-rolled integrator —
// no physics engine is loaded on the homepage.

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const ASSETS = 'https://nikoloside.graphics/deepfracture-live/assets/squirrel';
const ROT_X = new THREE.Matrix4().makeRotationX(-Math.PI / 2); // z-up -> y-up
const ROT_X_INV = ROT_X.clone().invert();
const IDLE_SPIN = 0.22;          // rad/s
const RESET_AFTER = 5.2;         // s after shatter
const NEON = new THREE.Color('#CAFF04');
const PURPLE = new THREE.Color('#8B5CF6');

const host = document.getElementById('fracture-hero');
if (host) init(host);

async function init(host) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  host.appendChild(renderer.domElement);
  renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0a0f, 0.055);

  const camera = new THREE.PerspectiveCamera(35, 1, 0.05, 60);
  const camBase = new THREE.Vector3(2.35, 0.95, 4.3);
  camera.position.copy(camBase);
  camera.lookAt(0, 0.05, 0);

  // --- lighting: soft key + brand-colored rims -------------------------
  scene.add(new THREE.AmbientLight(0x8888a0, 0.5));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(3, 6, 4);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = key.shadow.camera.bottom = -3;
  key.shadow.camera.right = key.shadow.camera.top = 3;
  scene.add(key);
  const rimP = new THREE.DirectionalLight(PURPLE, 3.2);
  rimP.position.set(-5, 2.2, -3);
  scene.add(rimP);
  const rimN = new THREE.DirectionalLight(NEON, 1.9);
  rimN.position.set(4.5, 0.6, -4);
  scene.add(rimN);

  // --- floor: faint polar grid + shadow catcher ------------------------
  const FLOOR_Y = -1.02;
  const grid = new THREE.PolarGridHelper(5.2, 16, 10, 96, 0x8b5cf6, 0x1e1e2e);
  grid.position.y = FLOOR_Y;
  grid.material.transparent = true;
  grid.material.opacity = 0.28;
  scene.add(grid);
  const catcher = new THREE.Mesh(
    new THREE.CircleGeometry(5.2, 64),
    new THREE.ShadowMaterial({ opacity: 0.35 }));
  catcher.rotation.x = -Math.PI / 2;
  catcher.position.y = FLOOR_Y - 0.001;
  catcher.receiveShadow = true;
  scene.add(catcher);

  // --- assets ----------------------------------------------------------
  const loader = new GLTFLoader();
  const b64f32 = (b) => new Float32Array(
    Uint8Array.from(atob(b), (c) => c.charCodeAt(0)).buffer);

  const [meta, targetGltf] = await Promise.all([
    fetch(`${ASSETS}/meta.json`).then((r) => r.json()),
    loader.loadAsync(`${ASSETS}/target.glb`),
  ]);
  const encW = b64f32(meta.encoderW), encB = b64f32(meta.encoderB);
  const cookbook = b64f32(meta.cookbook);

  // root holds model + floor so the whole vignette can sit right of the text
  const root = new THREE.Group();
  scene.add(root);
  root.add(grid);
  root.add(catcher);
  const group = new THREE.Group();
  root.add(group);
  const placeRoot = () => {
    root.position.x = (host.clientWidth / Math.max(host.clientHeight, 1)) < 1.05 ? 0 : 0.95;
  };
  placeRoot();

  const targetGeo = (() => {
    let g = null;
    targetGltf.scene.traverse((c) => { if (!g && c.isMesh) g = c.geometry; });
    g = g.clone();
    g.applyMatrix4(ROT_X);
    if (!g.attributes.normal) g.computeVertexNormals();
    return g;
  })();
  const porcelain = new THREE.MeshPhysicalMaterial({
    color: 0xe4e4ec, roughness: 0.34, clearcoat: 0.55,
    clearcoatRoughness: 0.35, transparent: true });
  const targetMesh = new THREE.Mesh(targetGeo, porcelain);
  targetMesh.castShadow = targetMesh.receiveShadow = true;
  group.add(targetMesh);

  // --- codebook selection (JS mirror of the paper's Cook) --------------
  const gauss = () => {
    const u = Math.max(Math.random(), 1e-9), v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  function selectCode(pos, dir, imp) {
    const x = [pos.x, pos.y, pos.z, dir.x, dir.y, dir.z, imp];
    const F = meta.featDim, D = F + meta.latentDim;
    const feat = new Float32Array(D);
    for (let i = 0; i < F; i++) {
      let s = encB[i];
      for (let j = 0; j < 7; j++) s += encW[i * 7 + j] * x[j];
      feat[i] = Math.sin(meta.w0 * s);
    }
    const std = Math.sqrt(2 / (1 + meta.latentDim));
    for (let i = F; i < D; i++) feat[i] = gauss() * std;
    let best = meta.codes[0], bd = Infinity;
    for (const c of meta.codes) {
      let d = 0;
      for (let i = 0; i < D; i++) { const t = feat[i] - cookbook[c * D + i]; d += t * t; }
      if (d < bd) { bd = d; best = c; }
    }
    return best;
  }

  // --- fracture lifecycle ----------------------------------------------
  const glbCache = new Map();
  const shards = [];            // {mesh, vel, ang, axis, born}
  let state = 'idle';           // idle | shattered | resetting
  let shatterTime = 0;
  const clock = new THREE.Clock();
  let elapsed = 0;

  const fragMaterial = (i) => {
    // golden-ratio hop so neighbouring fragments get distinct hues
    const t = (i * 0.618034) % 1;
    const c = PURPLE.clone().lerp(NEON, t).multiplyScalar(0.82 + Math.random() * 0.25);
    return new THREE.MeshPhysicalMaterial({
      color: c, emissive: c.clone().multiplyScalar(0.18),
      roughness: 0.42, clearcoat: 0.4, transparent: true });
  };

  async function shatter(hitWorld, dirWorld) {
    state = 'loading';
    const local = group.worldToLocal(hitWorld.clone());
    const posModel = local.clone().applyMatrix4(ROT_X_INV);
    const dirModel = dirWorld.clone().transformDirection(group.matrixWorld.clone().invert())
      .transformDirection(ROT_X_INV);
    const imp = Math.random() * 1.2 - 0.2;  // varied normalized impulse
    const code = selectCode(posModel, dirModel, imp);

    let gltf = glbCache.get(code);
    if (!gltf) {
      gltf = await loader.loadAsync(`${ASSETS}/codes/${String(code).padStart(3, '0')}.glb`);
      glbCache.set(code, gltf);
    }

    targetMesh.visible = false;
    const frags = [];
    gltf.scene.traverse((c) => { if (c.isMesh) frags.push(c); });
    frags.forEach((src, i) => {
      const geo = src.geometry.clone();
      geo.applyMatrix4(ROT_X);
      if (!geo.attributes.normal) geo.computeVertexNormals();
      geo.computeBoundingSphere();
      const c = geo.boundingSphere.center;
      const mesh = new THREE.Mesh(geo, fragMaterial(i));
      mesh.castShadow = true;
      group.add(mesh);

      const away = new THREE.Vector3().subVectors(c, local);
      const dist = Math.max(away.length(), 0.12);
      away.normalize();
      const strength = (1.3 + Math.random() * 0.8) * Math.min(1.8 / dist, 3.6) * (0.8 + imp * 0.3);
      const vel = away.multiplyScalar(strength)
        .addScaledVector(dirWorld, 0.9)
        .add(new THREE.Vector3(0, 0.5 + Math.random() * 0.5, 0));
      shards.push({
        mesh, vel,
        axis: new THREE.Vector3().randomDirection(),
        ang: (Math.random() - 0.5) * 6,
        pivot: c.clone(),
        pos: new THREE.Vector3(),
        rot: 0,
      });
    });
    state = 'shattered';
    shatterTime = elapsed;
  }

  function resetScene() {
    for (const s of shards) { group.remove(s.mesh); s.mesh.geometry.dispose(); }
    shards.length = 0;
    targetMesh.visible = true;
    porcelain.transparent = true;
    porcelain.opacity = 0;
    state = 'resetting';
  }

  // --- input -----------------------------------------------------------
  const ray = new THREE.Raycaster();
  const mouse = { x: 0, y: 0 };
  host.addEventListener('pointermove', (e) => {
    const r = host.getBoundingClientRect();
    mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    mouse.y = ((e.clientY - r.top) / r.height) * 2 - 1;
  });
  host.addEventListener('pointerdown', (e) => {
    if (state !== 'idle') return;
    const r = host.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((e.clientX - r.left) / r.width) * 2 - 1,
      -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hits = ray.intersectObject(targetMesh, false);
    if (!hits[0]) return;
    document.getElementById('fracture-hint')?.classList.add('opacity-0');
    shatter(hits[0].point, ray.ray.direction.clone());
  });

  // --- resize / visibility ---------------------------------------------
  function resize() {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    placeRoot();
  }
  new ResizeObserver(resize).observe(host);
  resize();

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; },
    { threshold: 0.02 }).observe(host);

  // --- loop ------------------------------------------------------------
  const tmpQ = new THREE.Quaternion();
  function tick() {
    requestAnimationFrame(tick);
    if (!visible) { clock.getDelta(); return; }
    const dt = Math.min(clock.getDelta(), 0.05);
    elapsed += dt;

    if (state === 'idle') group.rotation.y += IDLE_SPIN * dt;

    if (state === 'resetting') {
      porcelain.opacity = Math.min(porcelain.opacity + dt * 1.8, 1);
      if (porcelain.opacity >= 1) { porcelain.transparent = false; state = 'idle'; }
    }

    if (state === 'shattered') {
      const age = elapsed - shatterTime;
      for (const s of shards) {
        s.vel.y -= 2.6 * dt;
        s.pos.addScaledVector(s.vel, dt);
        s.rot += s.ang * dt;
        // spin around the shard's own centroid while translating
        tmpQ.setFromAxisAngle(s.axis, s.rot);
        s.mesh.quaternion.copy(tmpQ);
        s.mesh.position.copy(s.pivot).sub(s.pivot.clone().applyQuaternion(tmpQ)).add(s.pos);
        if (age > RESET_AFTER - 1.2) s.mesh.material.opacity = Math.max((RESET_AFTER - age) / 1.2, 0);
        // soft floor: damp and settle
        const worldY = s.mesh.position.y + s.pivot.y;
        if (worldY < FLOOR_Y + 0.1 && s.vel.y < 0) {
          s.vel.y *= -0.25; s.vel.x *= 0.7; s.vel.z *= 0.7; s.ang *= 0.6;
        }
      }
      if (age > RESET_AFTER) resetScene();
    }

    // gentle mouse parallax
    camera.position.x = camBase.x + mouse.x * 0.18;
    camera.position.y = camBase.y - mouse.y * 0.12;
    camera.lookAt(0, 0.05, 0);
    renderer.render(scene, camera);
  }
  tick();
}
