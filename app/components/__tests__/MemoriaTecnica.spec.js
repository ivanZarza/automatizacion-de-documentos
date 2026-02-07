import { mount } from '@vue/test-utils'
import MemoriaTecnica from '../MemoriaTecnica.vue'

describe('MemoriaTecnica.vue', () => {
  it('debería renderizar los inputs de texto principales', async () => {
    const wrapper = mount(MemoriaTecnica, {
      props: {
        modelValue: {
          apellidosNombre: '',
          nifCif: '',
          domicilio: '',
          codigoPostal: '',
          localidad: '',
          provincia: '',
          correoElectronico: '',
          telefono: ''
        }
      }
    })

    // Verifica que los inputs existen
    expect(wrapper.find('input[name="apellidosNombre"]').exists()).toBe(true)
    expect(wrapper.find('input[name="nifCif"]').exists()).toBe(true)
    expect(wrapper.find('input[name="domicilio"]').exists()).toBe(true)
    expect(wrapper.find('input[name="codigoPostal"]').exists()).toBe(true)
    expect(wrapper.find('input[name="localidad"]').exists()).toBe(true)
    expect(wrapper.find('input[name="provincia"]').exists()).toBe(true)
    expect(wrapper.find('input[name="correoElectronico"]').exists()).toBe(true)
    expect(wrapper.find('input[name="telefono"]').exists()).toBe(true)

    // Simula escribir en un input
    const input = wrapper.find('input[name="apellidosNombre"]')
    await input.setValue('Juan Pérez')
    expect(input.element.value).toBe('Juan Pérez')
  })
})
