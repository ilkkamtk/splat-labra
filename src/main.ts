import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
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
    -Math.PI / 2,
    Math.PI * 0.5,
    3,
    new Vector3(0, 0, 0),
    scene,
  );
  camera.attachControl(canvas, false);
  const light = new HemisphericLight('light1', new Vector3(1, 1, 1), scene);
  console.log(light);

  SceneLoader.ImportMeshAsync('splat', './', 'mario.splat', scene).then(
    (result) => {
      const splat = result.meshes[0];
      splat.position = new Vector3(-0.25, -0.14, 0);
      splat.rotation = new Vector3(0, -Math.PI / 3, 0);
      splat.scaling = new Vector3(0.6, 0.6, 0.6);
    },
  );
  SceneLoader.ImportMeshAsync('mesh', './', 'throne.glb', scene).then(
    (result) => {
      const throne = result.meshes[0];
      throne.position = new Vector3(0, 0, 0);
      throne.scaling = new Vector3(3, 3, 3);
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
