import * as THREE from 'three';

import {loadMaterial} from '../extras/api';
import {Loop} from '../extensions/Loop';
import {defaults} from '../utils/defaults';
import {World} from './World';
import {WHSObject} from './Object';

class Shape extends WHSObject {
  /**
   * Constructing WHS.Shape object.
   *
   * @param {Object} params - Inputed parameters.
   * @param {String} type - Shape type.
   * @return {WHS.Shape}
   */
  constructor(params, type) {
    if (!type) console.error('@constructor: Please specify " type ".');

    const _set = (x, y, z) => {
      this.x = x;
      this.y = y;
      this.z = z;
    };

    super({

      mass: 10,
      build: true,
      geometry: {},
      
      material: {
        kind: 'basic'
      },

      helpers: {
        box: false,
        boundingBox: false,
        edges: false,
        faceNormals: false
      },

      pos: {
        x: 0,
        y: 0,
        z: 0,
        set: _set
      },

      rot: {
        x: 0,
        y: 0,
        z: 0,
        set: _set
      },

      scale: {
        x: 1,
        y: 1,
        z: 1,
        set: _set
      },

      target: {
        x: 0,
        y: 0,
        z: 0,
        set: _set
      },

      morph: {
        speed: 1,
        duration: 1
      },

      physics: true

    });

    super.setParams(params);

    const scope = Object.assign(this,
      {
        _type: type,
        __params: params,

        wait: [],
        helpers: {
          box: false
        },

        physics: params.physics
      });

    if (defaults.debug) console.debug(`@WHS.Shape: Shape ${scope._type} found.`, scope);

    return scope;
  }

  wait(promise) {
    this.wait.push(promise);
    return this;
  }

  /**
   * Applying shadow & position & rotation.
   *
   * @param {...String} tags - Tags that defines what to do with shape
   * additionally.
   */
  wrap(...tags) {
    const _scope = this;

    if (tags.indexOf('wait') >= 0) {
      return new Promise((resolve, reject) => {
        Promise.all(_scope.wait).then(() => {
          try {
            _scope.getNative().castShadow = true;
            _scope.getNative().receiveShadow = true;

            _scope.position.set(
              _scope.__params.pos.x,
              _scope.__params.pos.y,
              _scope.__params.pos.z
            );

            _scope.rotation.set(
              _scope.__params.rot.x,
              _scope.__params.rot.y,
              _scope.__params.rot.z
            );

            _scope.scale.set(
              _scope.__params.scale.x,
              _scope.__params.scale.y,
              _scope.__params.scale.z
            );

            // Box helper.
            if (_scope.__params.helpers.box) {
              _scope.helpers.box = new THREE.BoxHelper(
                _scope.getNative()
              );
            }

            // Bounding box helper.
            if (_scope.__params.helpers.boundingBox) {
              _scope.helpers.boundingBox = new THREE.BoundingBoxHelper(
                _scope.getNative(),
                _scope.__params.helpers.boundingBox.color
                ? _scope.__params.helpers.boundingBox.color
                : 0xffffff
              );
            }

            // Edges helper.
            if (_scope.__params.helpers.edges) {
              _scope.helpers.edges = new THREE.EdgesHelper(
                _scope.getNative(),
                _scope.__params.helpers.edges.color
                ? _scope.__params.helpers.edges.color
                : 0xffffff
              );
            }

            // faceNormals helper.
            if (_scope.__params.helpers.faceNormals) {
              _scope.helpers.faceNormals = new THREE.FaceNormalsHelper(
                _scope.getNative(),
                _scope.__params.helpers.faceNormals.size
                ? _scope.__params.helpers.faceNormals.size
                : 2,
                _scope.__params.helpers.faceNormals.color
                ? _scope.__params.helpers.faceNormals.color
                : 0xffffff,
                _scope.__params.helpers.faceNormals.linewidth
                ? _scope.__params.helpers.faceNormals.linewidth
                : 1
              );
            }

            // vertexNormals helper.
            if (_scope.__params.helpers.vertexNormals) {
              _scope.helpers.vertexNormals = new THREE.VertexNormalsHelper(
                _scope.getNative(),
                _scope.__params.helpers.vertexNormals.size
                ? _scope.__params.helpers.vertexNormals.size
                : 2,
                _scope.__params.helpers.vertexNormals.color
                ? _scope.__params.helpers.vertexNormals.color
                : 0xffffff,
                _scope.__params.helpers.vertexNormals.linewidth
                ? _scope.__params.helpers.vertexNormals.linewidth
                : 1
              );
            }

            if (defaults.debug) console.debug(`@WHS.Shape: Shape ${_scope._type} is ready.`, _scope);

            _scope.emit('ready');

            resolve();
          } catch (err) {
            console.error(err.message);
            reject();
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        try {
          _scope.getNative().castShadow = true;
          _scope.getNative().receiveShadow = true;

          _scope.position.set(
            _scope.__params.pos.x,
            _scope.__params.pos.y,
            _scope.__params.pos.z
          );

          _scope.rotation.set(
            _scope.__params.rot.x,
            _scope.__params.rot.y,
            _scope.__params.rot.z
          );

          _scope.scale.set(
            _scope.__params.scale.x,
            _scope.__params.scale.y,
            _scope.__params.scale.z
          );

          // Box helper.
          if (_scope.__params.helpers.box) {
            _scope.helpers.box = new THREE.BoxHelper(
              _scope.getNative()
            );
          }

          // Bounding box helper.
          if (_scope.__params.helpers.boundingBox) {
            _scope.helpers.boundingBox = new THREE.BoundingBoxHelper(
              _scope.getNative(),
              _scope.__params.helpers.boundingBox.color
              ? _scope.__params.helpers.boundingBox.color
              : 0xffffff
            );
          }

          // Edges helper.
          if (_scope.__params.helpers.edges) {
            _scope.helpers.edges = new THREE.EdgesHelper(
              _scope.getNative(),
              _scope.__params.helpers.edges.color
              ? _scope.__params.helpers.edges.color
              : 0xffffff
            );
          }

          // faceNormals helper.
          if (_scope.__params.helpers.faceNormals) {
            _scope.helpers.faceNormals = new THREE.FaceNormalsHelper(
              _scope.getNative(),
              _scope.__params.helpers.faceNormals.size
              ? _scope.__params.helpers.faceNormals.size
              : 2,
              _scope.__params.helpers.faceNormals.color
              ? _scope.__params.helpers.faceNormals.color
              : 0xffffff,
              _scope.__params.helpers.faceNormals.linewidth
              ? _scope.__params.helpers.faceNormals.linewidth
              : 1
            );
          }

          // vertexNormals helper.
          if (_scope.__params.helpers.vertexNormals) {
            _scope.helpers.vertexNormals = new THREE.VertexNormalsHelper(
              _scope.getNative(),
              _scope.__params.helpers.vertexNormals.size
              ? _scope.__params.helpers.vertexNormals.size
              : 2,
              _scope.__params.helpers.vertexNormals.color
              ? _scope.__params.helpers.vertexNormals.color
              : 0xffffff,
              _scope.__params.helpers.vertexNormals.linewidth
              ? _scope.__params.helpers.vertexNormals.linewidth
              : 1
            );
          }

          if (defaults.debug) console.debug(`@WHS.Shape: Shape ${_scope._type} is ready.`, _scope);

          resolve();

          _scope.emit('ready');
        } catch (err) {
          console.error(err.message);
          reject();
        }
      });
    }
  }

  /**
   * Add shape to WHS.World object.
   *
   * @param {WHS.World} parent - World, were this shape will be.
   * @param {...String} tags - Tags for compiling.
   */
  addTo(parent, ...tags) {
    const _helpers = this.helpers,
      _scope = this;

    _scope.parent = parent;

    if (tags.indexOf('wait') >= 0) {
      return new Promise((resolve, reject) => {
        Promise.all(_scope.wait).then(() => {
          try {
            const parentNative = _scope.parent instanceof World
              ? _scope.parent.getScene()
              : _scope.parent.getNative();

            parentNative.add(_scope.getNative());
            _scope.parent.children.push(_scope);

            if (_scope.__params.helpers.box) parentNative.add(_helpers.box);

            if (_scope.__params.helpers.boundingBox) parentNative.add(_helpers.boundingBox);

            if (_scope.__params.helpers.edges) parentNative.add(_helpers.edges);

            if (_scope.__params.helpers.faceNormals) parentNative.add(_helpers.faceNormals);

            if (_scope.__params.helpers.vertexNormals) parentNative.add(_helpers.vertexNormals);
          } catch (err) {
            console.error(err.message);
            reject();
          } finally {
            if (_scope._wait) {
              _scope.getNative().addEventListener('ready', () => {
                resolve(_scope);
              });
            } else resolve(_scope);

            _scope.getNative().addEventListener('collide', () => {
              _scope.emit('collide');
            });

            if (defaults.debug) {
              console.debug(
                `@WHS.Shape: Shape ${_scope._type} was added to world.`,
                [_scope, _scope.parent]
              );
            }
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        try {
          const parentNative = _scope.parent instanceof World
            ? _scope.parent.getScene()
            : _scope.parent.getNative();

          parentNative.add(_scope.getNative());
          _scope.parent.children.push(_scope);

          if (_scope.__params.helpers.box)
            parentNative.add(_helpers.box);

          if (_scope.__params.helpers.boundingBox)
            parentNative.add(_helpers.boundingBox);

          if (_scope.__params.helpers.edges)
            parentNative.add(_helpers.edges);

          if (_scope.__params.helpers.faceNormals)
            parentNative.add(_helpers.faceNormals);

          if (_scope.__params.helpers.vertexNormals)
            parentNative.add(_helpers.vertexNormals);
        } catch (err) {
          console.error(err.message);
          reject();
        } finally {
          if (_scope._wait) {
            _scope.getNative().addEventListener('ready', () => {
              resolve(_scope);
            });
          } else resolve(_scope);

          _scope.getNative().addEventListener('collide', () => {
            _scope.emit('ready');
          });

          if (defaults.debug) {
            console.debug(
                `@WHS.Shape: Shape ${_scope._type} was added to world.`,
                [_scope, _scope.parent]
              );
          }
        }
      });
    }
  }

  /**
   * Initialize shape's material object.
   */
  _initMaterial(params) {
    return this.physics
      ? loadMaterial(params)._material
      : loadMaterial(params)._materialP;
  }

  /**
   * Clone shape.
   */
  clone() {
    return new WHS.Shape(this.getParams(), this._type).copy(this);
  }

  /**
   * Copy shape.
   *
   * @param {WHS.Shape} source - Source object, that will be applied to this.
   */
  copy(source) {
    this.setNative(source.getNative().clone());

    this.wrap();

    this.position = source.position.clone();
    this.rotation = source.rotation.clone();

    this._type = source._type;

    return this;
  }

  /**
   * Remove this shape from world.
   *
   * @return {WHS.Shape} - this.
   */
  remove() {
    this.parent.getScene().remove(this.getNative());

    this.parent.children.splice(this.parent.children.indexOf(this), 1);
    this.parent = null;

    this.emit('remove');

    if (defaults.debug) {
      console.debug(
        `@WHS.Shape: Shape ${this._type} was removed from world`,
        [this]
      );
    }

    return this;
  }

  /**
   * @return {WHS.World} - World object.
   */
  getWorld() {
    let p = this.parent;

    while (!(p instanceof World)) {
      if (p) p = p.parent;
      else return false;
    }

    return p;
  }

  get nposition() {
    return this.getNative().position;
  }

  get nrotation() {
    return this.getNative().position;
  }

  get position() {
    this.getNative().__dirtyPosition = true;
    return this.getNative().position;
  }

  set position(vector3) {
    this.getNative().__dirtyPosition = true;
    return this.getNative().position.copy(vector3);
  }

  get rotation() {
    this.getNative().__dirtyRotation = true;
    return this.getNative().rotation;
  }

  set rotation(euler) {
    this.getNative().__dirtyRotation = true;
    this.getNative().rotation.copy(euler);

    return this.getNative().rotation;
  }

  get scale() {
    return this.getNative().scale;
  }

  set scale(vector3) {
    this.getNative().scale = vector3;
    return this.getNative().scale;
  }

  G_(params = {}) {
    if (this.buildGeometry) {
      this.native.geometry = this.buildGeometry(
        this.updateParams({geometry: params})
      );
    }
  }

  /* Access private data */

  setNative(native) {
    this.native = native;
    return this.native;
  }

  getNative() {
    return this.native;
  }

  setMaterial(material) {
    this.native.material = material;
    return this.native.material;
  }

  setAngularVelocity(...args) {
    return this.getNative().setAngularVelocity(...args);
  }

  setLinearVelocity(...args) {
    return this.getNative().setLinearVelocity(...args);
  }

  follow(curve, time = 1000, loop) {
    const _scope = this,
      gEnd = time;

    let animation = new Loop(clock => {
      const u = clock.getElapsedTime() * 1000 / gEnd,
        vec1 = curve.getPoint(u % 1),
        vec2 = curve.getPoint((u + 0.01) % 1);

      _scope.position.set(vec1.x, vec1.y, vec1.z);
      _scope.getNative().lookAt(vec2);
    });

    _scope.getWorld().addLoop(animation);

    animation.start();

    if (loop) {
      setInterval(() => {
        animation.stop();

        animation = new Loop(clock => {
          const u = clock.getElapsedTime() * 1000 / gEnd,
            vec1 = curve.getPoint(u % 1),
            vec2 = curve.getPoint((u + 0.01) % 1);

          _scope.position.set(vec1.x, vec1.y, vec1.z);
          _scope.getNative().lookAt(vec2);
        });

        _scope.getWorld().addLoop(animation);

        animation.start();
      }, time);
    } else {
      setTimeout(() => {
        animation.stop();
         _scope.getWorld().removeLoop(animation);
      }, time);
    }
  }
}

export {
  Shape
};