import { beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { config } from '@vue/test-utils'

beforeEach(() => {
  setActivePinia(createPinia())
})

config.global.mocks = {
  $env: {
    VITE_API_URL: 'https://api.neds.com.au/rest/v1/racing/'
  }
}
