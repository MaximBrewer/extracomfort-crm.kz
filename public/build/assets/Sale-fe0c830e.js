import{u as S,r as u,W as I,j as e,d as D,a as A}from"./app-1444e377.js";import{I as E}from"./input-aa3456d2.js";import{C as $}from"./CancelButton-fefbc946.js";import{I as o}from"./InputError-c4d732d3.js";import{I as d}from"./InputLabel-5376ee84.js";import{S as z}from"./SuccessButton-50bcef1f.js";import{T as b}from"./TextInput-db1abcc2.js";import{m as p}from"./monthes-1737a886.js";import{A as M}from"./AuthenticatedLayout-4c9918aa.js";import"./ApplicationLogo-eb70d3d0.js";import"./SecondaryButton-fda2deb4.js";const V=i=>{const{sale:a=null,genders:v,localities:h}=i,{zeroPad:y}=S(),[g,f]=u.useState(a&&a.birthdate?new Date(a.birthdate).getMonth():0),[x,w]=u.useState(a&&a.birthdate?new Date(a.birthdate).getFullYear():1980),[j,N]=u.useState(a&&a.birthdate?new Date(a.birthdate).getDate():1),{data:t,setData:n,post:k,patch:_,processing:B,errors:s,reset:L,transform:P}=I({id:a?a.id:null,name:a&&a.name?a.name:"",lastname:a&&a.lastname?a.lastname:"",surname:a&&a.surname?a.surname:"",birthdate:a&&a.birthdate?a.birthdate:"01.01.1980",tin:a&&a.tin?`${a.tin}`:"",email:a&&a.email?a.email:"",phone:a&&a.phone?a.phone:"",addon:a&&a.addon?a.addon:"",gender:a&&a.gender?a.gender:"male",locality_id:a&&a.locality_id?a.locality_id:h.data.length?h.data[0].id:"",branch_id:a&&a.branch_id?a.branch_id:""});u.useEffect(()=>{n("birthdate",`${y(j,2)}.${y(1+1*g,2)}.${x}`)},[j,x,g]);const m=r=>{n(r.target.name,r.target.type==="checkbox"?r.target.checked:r.target.value)},C=r=>{r.preventDefault(),a&&a.id?_(route("admin.sales.update",{sale:a.id}),{onSuccess:()=>{}}):k(route("admin.sales.store"),{onSuccess:()=>{}})};return e.jsxs("form",{onSubmit:C,children:[e.jsxs("div",{className:"grid grid-cols-2 gap-16",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"mb-4",children:[e.jsx(d,{htmlFor:"name",value:"Имя*",color:"text-gray-200",weight:"normal"}),e.jsx(b,{id:"name",type:"text",placeholder:"Иван",name:"name",bg:"bg-white",border:"border border-gray-900 border-opacity-[.12]",rounded:"rounded",value:t.name,className:"mt-1 block w-full",onChange:m}),e.jsx(o,{message:s.name,className:"mt-2"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx(d,{htmlFor:"lastname",value:"Фамилия*",color:"text-gray-200",weight:"normal"}),e.jsx(b,{id:"lastname",type:"text",rounded:"rounded",placeholder:"Иванов",border:"border border-gray-900 border-opacity-[.12]",name:"lastname",bg:"bg-white",value:t.lastname,className:"mt-1 block w-full",onChange:m}),e.jsx(o,{message:s.lastname,className:"mt-2"})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-12",children:[e.jsxs("div",{className:"mb-4",children:[e.jsx(d,{htmlFor:"surname",value:"Отчество (если имеется)",color:"text-gray-200",weight:"normal"}),e.jsx(b,{id:"surname",type:"text",name:"surname",placeholder:"Иванович",bg:"bg-white",border:"border border-gray-900 border-opacity-[.12]",rounded:"rounded",value:t.surname,className:"mt-1 block w-full",onChange:m}),e.jsx(o,{message:s.surname,className:"mt-2"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx(d,{htmlFor:"phone",value:"Phone*",color:"text-gray-200",weight:"normal"}),e.jsx(b,{id:"phone",type:"text",name:"phone",bg:"bg-white",placeholder:"+77777777777",border:"border border-gray-900 border-opacity-[.12]",rounded:"rounded",value:t.phone,className:"mt-1 block w-full",onChange:m}),e.jsx(o,{message:s.phone,className:"mt-2"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-12",children:[e.jsxs("div",{className:"mb-4",children:[e.jsx(d,{htmlFor:"tin",value:"ИИН",color:"text-gray-200",weight:"normal"}),e.jsx(E,{mask:"0000 0000 0000",value:t.tin,unmask:!0,onAccept:(r,l)=>{m({target:{value:r,name:"tin"}})},className:"rounded bg-white border border-gray-900 border-opacity-[.12] ring-0 mt-1 block w-full",type:"text"}),e.jsx(o,{message:s.tin,className:"mt-2"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx(d,{htmlFor:"email",value:"E-mail*",color:"text-gray-200",weight:"normal"}),e.jsx(b,{id:"email",type:"email",name:"email",bg:"bg-white",placeholder:"example@mail.com",border:"border border-gray-900 border-opacity-[.12]",rounded:"rounded",value:t.email,className:"mt-1 block w-full",onChange:m}),e.jsx(o,{message:s.email,className:"mt-2"})]})]})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("div",{className:"mb-4",children:[e.jsx(d,{htmlFor:"birthdate",value:"Дата рождения*",color:"text-gray-200",weight:"normal"}),e.jsxs("div",{className:"grid grid-cols-11 gap-4",children:[e.jsx("div",{className:"col-span-3",children:e.jsx("select",{onChange:r=>N(r.target.value),defaultValue:j,className:"w-full rounded bg-white border border-gray-900 border-opacity-[.12] ring-0 mt-1 block w-full",children:new Array(x%4?p[g].days:p[g].days+1).fill(null).map((r,l)=>e.jsx("option",{value:l+1,children:l+1},l+1))})}),e.jsx("div",{className:"col-span-5",children:e.jsx("select",{onChange:r=>f(r.target.value),defaultValue:g,className:"w-full rounded bg-white border border-gray-900 border-opacity-[.12] ring-0 mt-1 block w-full",children:p.map((r,l)=>e.jsx("option",{value:l,children:r.title},l))})}),e.jsx("div",{className:"col-span-3",children:e.jsx("select",{onChange:r=>w(r.target.value),defaultValue:x,className:"w-full rounded bg-white border border-gray-900 border-opacity-[.12] ring-0 mt-1 block w-full",children:new Array(70).fill(null).map((r,l)=>e.jsx("option",{value:l+1950,children:l+1950},l+1950))})})]}),e.jsx(o,{message:s.birthdate,className:"mt-2"})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-4",children:[e.jsxs("div",{className:"mb-4",children:[e.jsx(d,{htmlFor:"gender",value:"Пол*",color:"text-gray-200",weight:"normal"}),e.jsx("select",{value:t.gender,onChange:r=>n("gender",r.target.value),className:"w-full rounded bg-white border border-gray-900 border-opacity-[.12] ring-0 mt-1 block w-full",children:v.map((r,l)=>e.jsx("option",{value:r.value,children:r.label},l))}),e.jsx(o,{message:s.gender,className:"mt-2"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx(d,{htmlFor:"locality_id",value:"Населенный пункт",color:"text-gray-200",weight:"normal"}),e.jsx("select",{value:t.locality_id,onChange:r=>{let l=h.data.find(c=>c.id==r.target.value);n(c=>({...c,locality_id:r.target.value,branch_id:l&&l.branches.length?l.branches[0].id:""}))},className:"w-full rounded bg-white border border-gray-900 border-opacity-[.12] ring-0 mt-1 block w-full",children:h.data.map((r,l)=>e.jsx("option",{value:r.id,children:r.title},l))}),e.jsx(o,{message:s.locality_id,className:"mt-2"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx(d,{htmlFor:"locality_id",value:"Филиал",color:"text-gray-200",weight:"normal"}),e.jsx("select",{value:t.branch_id,onChange:r=>n("branch_id",r.target.value),className:"w-full rounded bg-white border border-gray-900 border-opacity-[.12] ring-0 mt-1 block w-full",children:h.data.map((r,l)=>e.jsx(u.Fragment,{children:r.id==t.locality_id?r.branches.map((c,F)=>e.jsx("option",{value:c.id,children:c.title},F)):""},l))}),e.jsx(o,{message:s.branch_id,className:"mt-2"})]})]}),e.jsxs("div",{className:"grow mb-4 flex flex-col",children:[e.jsx(d,{htmlFor:"addon",value:"Дополнительная информация",color:"text-gray-200",weight:"normal"}),e.jsx("textarea",{value:t.addon,onChange:r=>n("addon",r.target.value),className:"w-full rounded bg-white border border-gray-900 border-opacity-[.12] ring-0 mt-1 block w-full grow"}),e.jsx(o,{message:s.birthdate,className:"mt-2"})]})]})]}),e.jsxs("div",{className:"flex space-x-8 items-center justify-end",children:[e.jsx(D,{href:route("admin.sales.index"),children:e.jsx($,{className:"my-4 justify-center text-lg font-semibold",size:"wide",children:"Отменить"})}),e.jsx(z,{type:"submit",className:"my-4 justify-center text-lg font-semibold",size:"wide",children:"Сохранить"})]})]})},U=i=>{const{pagetitle:a}=i;return e.jsxs(M,{auth:i.auth,errors:i.errors,heading:e.jsx("h1",{className:"font-semibold text-3xl text-gray-800 leading-tight",children:a}),children:[e.jsx(A,{title:a}),e.jsx("div",{className:"pb-12 pt-5",children:e.jsx(V,{...i})})]})};export{U as default};