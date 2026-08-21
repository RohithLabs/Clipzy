/**
 * Clipzy 3D WebGL Studio Engine (Three.js)
 * Real-time hardware-accelerated 3D avatar rendering with PBR shaders,
 * dynamic vertex deformation (simplex noise squishy blob), orbiting particle stars,
 * and mouse drag rotation.
 */

import * as THREE from 'three'

export type PBRMaterialType =
  | 'gold'
  | 'chrome'
  | 'hologram'
  | 'glass'
  | 'iridescent'
  | 'clay'
  | 'obsidian'
  | 'plasma'

export type GeometryType =
  | 'squishy_blob'
  | 'crystal'
  | 'torus_knot'
  | 'star_poly'
  | 'smooth_sphere'

export interface ThreeSceneOptions {
  container: HTMLElement
  width: number
  height: number
  materialType?: PBRMaterialType
  geometryType?: GeometryType
  baseColor?: string
  autoRotate?: boolean
  showParticles?: boolean
  wireframe?: boolean
}

export class ThreeScene {
  private container: HTMLElement
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private renderer: THREE.WebGLRenderer
  private mainMesh: THREE.Mesh | null = null
  private particleSystem: THREE.Points | null = null
  private keyLight: THREE.DirectionalLight
  private fillLight: THREE.PointLight
  private rimLight: THREE.PointLight
  private ambientLight: THREE.AmbientLight

  private materialType: PBRMaterialType = 'iridescent'
  private geometryType: GeometryType = 'squishy_blob'
  private baseColor: string = '#a855f7'
  private autoRotate: boolean = true
  private showParticles: boolean = true
  private wireframe: boolean = false

  private clock = new THREE.Clock()
  private rafId = 0
  private isDragging = false
  private prevPointerX = 0
  private prevPointerY = 0
  private targetRotationX = 0
  private targetRotationY = 0
  private currentRotationX = 0
  private currentRotationY = 0

  private basePositions: Float32Array | null = null

  constructor(options: ThreeSceneOptions) {
    this.container = options.container
    this.materialType = options.materialType ?? 'iridescent'
    this.geometryType = options.geometryType ?? 'squishy_blob'
    this.baseColor = options.baseColor ?? '#a855f7'
    this.autoRotate = options.autoRotate ?? true
    this.showParticles = options.showParticles ?? true
    this.wireframe = options.wireframe ?? false

    // 1. Scene setup
    this.scene = new THREE.Scene()

    // 2. Camera setup
    this.camera = new THREE.PerspectiveCamera(45, options.width / options.height, 0.1, 100)
    this.camera.position.set(0, 0, 4.5)

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setSize(options.width, options.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.1
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.container.appendChild(this.renderer.domElement)

    // 4. Lighting setup
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    this.scene.add(this.ambientLight)

    this.keyLight = new THREE.DirectionalLight(0xffffff, 2.2)
    this.keyLight.position.set(5, 6, 5)
    this.keyLight.castShadow = true
    this.scene.add(this.keyLight)

    this.fillLight = new THREE.PointLight(0x06b6d4, 1.8, 10)
    this.fillLight.position.set(-4, -2, 3)
    this.scene.add(this.fillLight)

    this.rimLight = new THREE.PointLight(0xf43f5e, 2.4, 10)
    this.rimLight.position.set(0, 4, -4)
    this.scene.add(this.rimLight)

    // 5. Build Initial Mesh & Particles
    this.rebuildMesh()
    if (this.showParticles) {
      this.initParticles()
    }

    // 6. Bind Interactions
    this.bindEvents()

    // 7. Start Render Loop
    this.animate()
  }

  private createMaterial(): THREE.Material {
    const col = new THREE.Color(this.baseColor)

    switch (this.materialType) {
      case 'gold':
        return new THREE.MeshPhysicalMaterial({
          color: 0xffd700,
          metalness: 0.95,
          roughness: 0.15,
          clearcoat: 0.5,
          wireframe: this.wireframe
        })

      case 'chrome':
        return new THREE.MeshPhysicalMaterial({
          color: 0xf1f5f9,
          metalness: 1.0,
          roughness: 0.08,
          clearcoat: 1.0,
          wireframe: this.wireframe
        })

      case 'hologram':
        return new THREE.MeshPhysicalMaterial({
          color: 0x06b6d4,
          emissive: 0x0891b2,
          emissiveIntensity: 0.6,
          metalness: 0.2,
          roughness: 0.1,
          transparent: true,
          opacity: 0.85,
          wireframe: true
        })

      case 'glass':
        return new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          transmission: 0.85,
          opacity: 1,
          transparent: true,
          roughness: 0.12,
          ior: 1.45,
          thickness: 1.2,
          wireframe: this.wireframe
        })

      case 'iridescent':
        return new THREE.MeshPhysicalMaterial({
          color: col,
          iridescence: 1.0,
          iridescenceIOR: 1.35,
          metalness: 0.4,
          roughness: 0.2,
          clearcoat: 0.6,
          wireframe: this.wireframe
        })

      case 'clay':
        return new THREE.MeshStandardMaterial({
          color: col,
          roughness: 0.85,
          metalness: 0.05,
          wireframe: this.wireframe
        })

      case 'obsidian':
        return new THREE.MeshPhysicalMaterial({
          color: 0x09090b,
          metalness: 0.8,
          roughness: 0.1,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          wireframe: this.wireframe
        })

      case 'plasma':
        return new THREE.MeshStandardMaterial({
          color: 0xef4444,
          emissive: 0xf97316,
          emissiveIntensity: 0.75,
          roughness: 0.35,
          metalness: 0.3,
          wireframe: this.wireframe
        })

      default:
        return new THREE.MeshStandardMaterial({ color: col, wireframe: this.wireframe })
    }
  }

  private createGeometry(): THREE.BufferGeometry {
    switch (this.geometryType) {
      case 'squishy_blob': {
        const geom = new THREE.IcosahedronGeometry(1.2, 32)
        const pos = geom.attributes.position
        if (pos) {
          this.basePositions = new Float32Array(pos.array)
        }
        return geom
      }

      case 'crystal':
        this.basePositions = null
        return new THREE.IcosahedronGeometry(1.2, 1)

      case 'torus_knot':
        this.basePositions = null
        return new THREE.TorusKnotGeometry(0.75, 0.28, 100, 16)

      case 'star_poly':
        this.basePositions = null
        return new THREE.DodecahedronGeometry(1.2, 0)

      case 'smooth_sphere':
      default:
        this.basePositions = null
        return new THREE.SphereGeometry(1.2, 48, 48)
    }
  }

  public rebuildMesh(): void {
    if (this.mainMesh) {
      this.scene.remove(this.mainMesh)
      this.mainMesh.geometry.dispose()
      if (Array.isArray(this.mainMesh.material)) {
        this.mainMesh.material.forEach((m) => m.dispose())
      } else {
        this.mainMesh.material.dispose()
      }
    }

    const geometry = this.createGeometry()
    const material = this.createMaterial()
    this.mainMesh = new THREE.Mesh(geometry, material)
    this.mainMesh.castShadow = true
    this.mainMesh.receiveShadow = true
    this.scene.add(this.mainMesh)
  }

  private initParticles(): void {
    const count = 350
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const c1 = new THREE.Color(0x06b6d4)
    const c2 = new THREE.Color(0xa855f7)
    const c3 = new THREE.Color(0xf43f5e)

    for (let i = 0; i < count; i++) {
      const radius = 1.8 + Math.random() * 1.6
      const theta = Math.random() * Math.PI * 2
      const phi = (Math.random() - 0.5) * Math.PI

      positions[i * 3] = radius * Math.cos(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi)
      positions[i * 3 + 2] = radius * Math.cos(phi) * Math.sin(theta)

      const choice = Math.random()
      const c = choice < 0.33 ? c1 : choice < 0.66 ? c2 : c3
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const mat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    })

    this.particleSystem = new THREE.Points(geom, mat)
    this.scene.add(this.particleSystem)
  }

  private updateBlobDeformation(elapsed: number): void {
    if (!this.mainMesh || this.geometryType !== 'squishy_blob' || !this.basePositions) return

    const positionAttribute = this.mainMesh.geometry.attributes.position
    if (!positionAttribute) return

    const pos = positionAttribute.array as Float32Array
    const base = this.basePositions
    const count = pos.length / 3

    const freq = 1.8
    const amp = 0.16

    for (let i = 0; i < count; i++) {
      const x = base[i * 3]!
      const y = base[i * 3 + 1]!
      const z = base[i * 3 + 2]!

      // Mathematical pseudo-noise vertex wave
      const wave =
        Math.sin(x * freq + elapsed * 2.2) *
        Math.cos(y * freq + elapsed * 1.8) *
        Math.sin(z * freq + elapsed * 2.0)

      const factor = 1 + wave * amp

      pos[i * 3] = x * factor
      pos[i * 3 + 1] = y * factor
      pos[i * 3 + 2] = z * factor
    }

    positionAttribute.needsUpdate = true
    this.mainMesh.geometry.computeVertexNormals()
  }

  private bindEvents(): void {
    const dom = this.renderer.domElement

    dom.addEventListener('pointerdown', (e) => {
      this.isDragging = true
      this.prevPointerX = e.clientX
      this.prevPointerY = e.clientY
    })

    window.addEventListener('pointermove', (e) => {
      if (!this.isDragging) return
      const dx = e.clientX - this.prevPointerX
      const dy = e.clientY - this.prevPointerY
      this.targetRotationY += dx * 0.008
      this.targetRotationX += dy * 0.008
      this.prevPointerX = e.clientX
      this.prevPointerY = e.clientY
    })

    window.addEventListener('pointerup', () => {
      this.isDragging = false
    })
  }

  public setMaterialType(type: PBRMaterialType): void {
    this.materialType = type
    this.rebuildMesh()
  }

  public setGeometryType(type: GeometryType): void {
    this.geometryType = type
    this.rebuildMesh()
  }

  public setBaseColor(color: string): void {
    this.baseColor = color
    this.rebuildMesh()
  }

  public setAutoRotate(on: boolean): void {
    this.autoRotate = on
  }

  public setWireframe(on: boolean): void {
    this.wireframe = on
    this.rebuildMesh()
  }

  public resize(width: number, height: number): void {
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  private animate = (): void => {
    this.rafId = requestAnimationFrame(this.animate)
    const elapsed = this.clock.getElapsedTime()

    // Smooth rotation lerp
    if (this.autoRotate && !this.isDragging) {
      this.targetRotationY += 0.008
    }

    this.currentRotationX += (this.targetRotationX - this.currentRotationX) * 0.1
    this.currentRotationY += (this.targetRotationY - this.currentRotationY) * 0.1

    if (this.mainMesh) {
      this.mainMesh.rotation.x = this.currentRotationX
      this.mainMesh.rotation.y = this.currentRotationY

      // Deform blob
      if (this.geometryType === 'squishy_blob') {
        this.updateBlobDeformation(elapsed)
      }
    }

    if (this.particleSystem) {
      this.particleSystem.rotation.y = -elapsed * 0.12
      this.particleSystem.rotation.x = Math.sin(elapsed * 0.1) * 0.15
    }

    // Dynamic fill light orbit
    this.fillLight.position.x = Math.cos(elapsed * 1.2) * 4
    this.fillLight.position.z = Math.sin(elapsed * 1.2) * 4

    this.renderer.render(this.scene, this.camera)
  }

  public dispose(): void {
    cancelAnimationFrame(this.rafId)
    if (this.renderer.domElement.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement)
    }
    this.renderer.dispose()
  }
}
