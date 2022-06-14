import React from 'react'
import { render } from 'react-dom'

import { Entry } from './component'

const rootElement = document.getElementById('app')

render(<Entry />, rootElement)
