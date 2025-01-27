
import * as THREE from 'three';

export const generateModels = (data: {name: string, imagePath: string, description: string}[]) => {

    const createIconMaterial = (imagePath: string) => {
        const texture = new THREE.TextureLoader().load(imagePath)
        return new THREE.ShaderMaterial({
            uniforms: {
              baseColor: { value: new THREE.Color(0xf3f3f3) },
              textureMap: { value: texture },
            },
            vertexShader: `
              varying vec2 vUv;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
            fragmentShader: `
              uniform vec3 baseColor;
              uniform sampler2D textureMap;
              varying vec2 vUv;
              void main() {
                vec4 texColor = texture2D(textureMap, vUv);
                vec3 blendedColor = mix(baseColor, texColor.rgb, texColor.a);
                gl_FragColor = vec4(blendedColor, 1.0);
              }
            `,
            transparent: true, // Allow transparency
          });
      }
    
    const createTextTexture = (text: string) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 112; //224
        canvas.height = 38; //84
        
        if(context){
            context.fillStyle = '#646161'; // Background color
            context.fillRect(0, 0, canvas.width, canvas.height);
        
            context.fillStyle = '#000000'; // Text color
            context.font = '30px sans-serif'; // Font size and family 60px
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(text, canvas.width / 2, canvas.height / 1.7);
        }
    
        return new THREE.CanvasTexture(canvas)
    }

    const geometryGroup = new THREE.Group();

    data.map((data, index) => {
    
        const geometry = new THREE.BoxGeometry(1, 1, 0.33);
        const defaultMaterial = new THREE.MeshBasicMaterial({ color: 0x404040 });
    
        const textMaterial = new THREE.MeshStandardMaterial({map: createTextTexture(data.name)});
        const iconMaterial = createIconMaterial(data.imagePath)
    
        const materials = [
            defaultMaterial,
            defaultMaterial,
            defaultMaterial,
            textMaterial,
            iconMaterial,
            defaultMaterial,
        ]
        const mesh = new THREE.Mesh(geometry, materials);
        mesh.position.setX(index <= 3 ? index + 0.4 * index : (index - 4) + 0.4 * (index - 4)); 
        mesh.position.setY(index > 3 ? -1.5 : 0); 
        mesh.position.setZ(0); 
        mesh.name = index + ''
        
        geometryGroup.add(mesh);
    })

    return geometryGroup
}