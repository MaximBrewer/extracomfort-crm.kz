import{u as o,j as e,a as n}from"./app-6d4591f4.js";import{C as d}from"./ChooseBranche-c2e6afae.js";import{P as c}from"./PrimaryButton-ec7e5671.js";import{A as h}from"./AuthenticatedLayout-d9dd212c.js";import{P as x}from"./Paginate-476d73cc.js";import"./InputError-e204cdef.js";import"./InputLabel-53a9cf23.js";import"./react-select.esm-164d3aec.js";import"./floating-ui.dom-4bc0055b.js";import"./TextInput-8d6667b0.js";import"./ApplicationLogo-9d166147.js";import"./SecondaryButton-4f53400a.js";import"./ChevronRight-e98c622d.js";const A=s=>{const{pagetitle:i,patients:t}=s,{setModal:m}=o();return e.jsxs(h,{auth:s.auth,errors:s.errors,heading:e.jsx("div",{className:"flex space-x-4 items-center",children:e.jsx("h1",{className:"font-semibold text-3xl text-gray-800 leading-tight",children:i})}),children:[e.jsx(n,{title:i}),e.jsx("div",{className:"shadow-bb rounded-lg bg-white py-5 px-6 overflow-y-auto",children:t.data.map((a,l)=>e.jsxs("div",{className:"flex space-x-5 items-center mb-5 p-5 rounded-lg bg-blue-50 hover:bg-white hover:shadow-block",preserveState:!0,children:[e.jsxs("div",{className:"w-[20%]",children:[e.jsxs("div",{className:"font-medium",children:[a.name," ",a.lastname]}),e.jsx("div",{className:"text-sm",children:"30 лет"})]}),e.jsx("div",{className:"grow",children:e.jsx("div",{className:"",children:a.email})}),e.jsx("div",{className:"shrink-0",children:e.jsx("div",{onClick:r=>{r.preventDefault(),r.stopPropagation(),m(e.jsx(d,{...s,user:a}))},children:e.jsx(c,{className:"min-w-[150px] justify-center",size:"sm",children:e.jsx("span",{children:"Записать"})})})})]},l))}),e.jsx("div",{className:"min-h-12",children:e.jsx(x,{...t})})]})};export{A as default};