import { AppConfig } from '@/app'
import { vkBridge } from '@/shared/index.ts'
import { createRoot } from 'react-dom/client'

vkBridge.send('VKWebAppInit')

createRoot(document.getElementById('root')!).render(<AppConfig />)

if (import.meta.env.MODE === 'development') {
  import('./eruda.ts')
}
