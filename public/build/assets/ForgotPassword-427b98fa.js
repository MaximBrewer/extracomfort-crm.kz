import{W as c,j as e,a as d}from"./app-6d4591f4.js";import{G as u}from"./GuestLayout-bf286905.js";import{I as x}from"./InputError-e204cdef.js";import{P as p}from"./PrimaryButton-ec7e5671.js";import{T as f}from"./TextInput-8d6667b0.js";import"./ApplicationLogo-9d166147.js";function y({status:t}){const{data:a,setData:m,post:r,processing:i,errors:o}=c({email:""}),l=s=>{m(s.target.name,s.target.value)},n=s=>{s.preventDefault(),r(route("password.email"))};return e.jsxs(u,{children:[e.jsx(d,{title:"Забыли пароль?"}),e.jsx("div",{className:"mb-4 text-sm text-gray-600",children:"Забыли пароль? Без проблем. Просто сообщите нам свой адрес электронной почты, и мы вышлем вам ссылку для сброса пароля, которая позволит вам выбрать новый."}),t&&e.jsx("div",{className:"mb-4 font-medium text-sm text-green-600",children:t}),e.jsxs("form",{onSubmit:n,children:[e.jsx(f,{id:"email",type:"email",name:"email",value:a.email,className:"mt-1 block w-full",isFocused:!0,onChange:l}),e.jsx(x,{message:o.email,className:"mt-2"}),e.jsx("div",{className:"flex items-center justify-end mt-4",children:e.jsx(p,{className:"ml-4",disabled:i,children:"Получить ссылку"})})]})]})}export{y as default};