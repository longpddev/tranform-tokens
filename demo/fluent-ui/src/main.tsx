import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {FluentProvider} from '@fluentui/react-components'
import {lightTokens} from './tokens.ts'
// console.log(JSON.stringify(Object.fromEntries(Array.from(Object.keys(lightTokens)).sort((a, b) => {
//   const length = Math.min(a.length, b.length);
//   for(let i = 0; i < length; i++) {
//     const codeA = a.charCodeAt(i);
//     const codeB = b.charCodeAt(i);
//     if(codeA !== codeB) return codeA - codeB;
//   }

//   return a.length - b.length
// }).map((key) => ([key, true])))))
console.log(lightTokens.colorBrandBackground)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FluentProvider theme={lightTokens}>
      <App />
    </FluentProvider>
  </React.StrictMode>,
)
