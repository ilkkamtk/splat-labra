import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  Scene,
  SceneLoader,
  Vector3,
} from 'babylonjs';
import 'babylonjs-loaders';

import './style.css';

const canvas = document.getElementById(
  'renderCanvas',
) as HTMLCanvasElement | null;

const engine = new Engine(canvas, true, {
  preserveDrawingBuffer: true,
  stencil: true,
});

const createScene = () => {
  const scene = new Scene(engine);
  const camera = new ArcRotateCamera(
    'camera1',
    Math.PI / 2,
    Math.PI / 4,
    10,
    new Vector3(-2, 2, 2),
    scene,
  );
  camera.attachControl(canvas, false);
  const light = new HemisphericLight('light1', new Vector3(1, 1, 1), scene);
  console.log(light);
  const sphere = MeshBuilder.CreateSphere(
    'sphere1',
    { segments: 16, diameter: 2, sideOrientation: Mesh.FRONTSIDE },
    scene,
  );
  sphere.position = new Vector3(2, 1, 0);
  const ground = MeshBuilder.CreateGround(
    'ground1',
    { width: 6, height: 6, subdivisions: 2, updatable: false },
    scene,
  );
  console.log(ground);
  SceneLoader.ImportMeshAsync('splat', './', 'clstesti.splat', scene).then(
    (result) => {
      const splat = result.meshes[0];
      splat.position = new Vector3(0, 0, 0);
    },
  );
  return scene;
};

const scene = createScene();
engine.runRenderLoop(function () {
  scene.render();
});

window.addEventListener('resize', function () {
  engine.resize();
});
