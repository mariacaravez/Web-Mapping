(this["webpackJsonpuse-mapbox-gl-js-with-react"]=this["webpackJsonpuse-mapbox-gl-js-with-react"]||[]).push([[0],{163:function(e,t,a){},189:function(e,t,a){"use strict";a.r(t);var c=a(0),s=a.n(c),n=a(53),r=a.n(n),l=a(56),i=(a(161),a(162),a(163),a(142));var o=a.n(i).a.create({baseURL:"api"}),j=a(10),b=a(143),d=a(113),u=a.n(d),O=a(5);u.a.accessToken=b.a.MB_TOKEN;var h=()=>{const e=Object(c.useRef)(null),t=Object(c.useRef)(null),[a,s]=Object(c.useState)(-74.5),[n,r]=Object(c.useState)(40),[l,i]=Object(c.useState)(2);return Object(c.useEffect)((()=>{t.current||(t.current=new u.a.Map({container:e.current,style:"mapbox://styles/mapbox/satellite-v9",center:[a,n],zoom:l}),t.current.addControl(new u.a.NavigationControl,"top-right"))}),[]),Object(c.useEffect)((()=>{t.current&&t.current.on("move",(()=>{s(t.current.getCenter().lng.toFixed(4)),r(t.current.getCenter().lat.toFixed(4)),i(t.current.getZoom().toFixed(2))}))})),Object(O.jsxs)("div",{children:[Object(O.jsxs)("div",{className:"sidebar",children:["Longitude: ",a," | Latitude: ",n," | ",l]}),Object(O.jsx)("div",{ref:e,className:"map-container"})]})},x=a(206),g=a(207),m=a(104),p=a(201),v=a(205);var C=()=>{const[e,t]=Object(c.useState)(""),[a,s]=Object(c.useState)(""),[n,r]=Object(c.useState)(""),[l,i]=Object(c.useState)(""),[j,b]=Object(c.useState)("");return Object(O.jsx)("div",{className:"alignment",children:Object(O.jsx)(x.a,{children:Object(O.jsxs)(g.a,{children:[Object(O.jsx)(m.a,{style:{color:"white",backgroundColor:"#3a7dcf"},size:"huge",attached:"top",children:"Create Account"}),Object(O.jsxs)(p.a,{onSubmit:(console.log("button clicked"),void o.post("/new-user",{firstname:e,lastname:a,email:n,password:l}).then((e=>{console.log(e)}))),style:{paddingTop:"5%"},children:[Object(O.jsxs)(p.a.Group,{children:[Object(O.jsx)(p.a.Input,{required:!0,label:"First Name",value:e,onChange:e=>{t(e.target.value)}}),Object(O.jsx)(p.a.Input,{required:!0,label:"Last Name",value:a,onChange:e=>{s(e.target.value)}})]}),Object(O.jsx)(p.a.Input,{required:!0,type:"email",label:"Email",value:n,onChange:e=>{r(e.target.value)}}),Object(O.jsx)(p.a.Input,{required:!0,type:"password",label:"Password",value:l,onChange:e=>{i(e.target.value)}}),Object(O.jsx)(p.a.Input,{required:!0,type:"password",label:"Confirm Password",value:j,onChange:e=>{b(e.target.value)}}),Object(O.jsx)(p.a.Field,{className:"alignment",children:Object(O.jsx)(v.a,{style:{color:"white",backgroundColor:"#3a7dcf"},type:"submit",children:"Sign Up"})})]})]})})})},f=a(204);var w=()=>{const[e,t]=Object(c.useState)(""),[a,s]=Object(c.useState)(""),[n,r]=Object(c.useState)("");return Object(O.jsx)("div",{className:"alignment",children:Object(O.jsx)(x.a,{children:Object(O.jsxs)(g.a,{children:[Object(O.jsx)(m.a,{style:{color:"white",backgroundColor:"#2d8a1d"},size:"huge",attached:"top",children:"Login"}),Object(O.jsxs)(p.a,{onSubmit:()=>{console.log("FE Fetch"),o.post("/login",{email:e,password:a}).then((e=>{console.log(e),e.data.auth?(r(!0),localStorage.setItem("token",e.data.jwtToken),console.log("Login Successful!")):(r(!1),console.log("Login Failed."),console.log(e))}))},style:{paddingTop:"10%"},children:[Object(O.jsx)(p.a.Input,{required:!0,type:"email",label:"Email",value:e,onChange:e=>{t(e.target.value)}}),Object(O.jsx)(p.a.Input,{required:!0,type:"password",label:"Password",value:a,onChange:e=>{s(e.target.value)}}),Object(O.jsx)(p.a.Field,{className:"alignment",children:Object(O.jsx)(v.a,{style:{color:"white",backgroundColor:"#2d8a1d"},type:"submit",children:"Login"})})]}),n&&Object(O.jsx)(f.a,{success:n,header:"You have successfuly made an account!",content:"You can now login with your credentials."})]})})})},y=a(209),S=a(79);var k=()=>Object(O.jsx)("div",{children:Object(O.jsxs)(y.a,{as:"h2",icon:!0,children:[Object(O.jsx)(S.a,{name:"user",circular:!0}),Object(O.jsx)(y.a.Content,{children:"User Name"})]})}),I=a(202),N=a(200),F=a(203);var L=()=>{const[e,t]=Object(c.useState)(!1),[a,s]=Object(c.useState)(!1);return Object(O.jsxs)(I.a,{size:"small",children:[Object(O.jsx)(I.a.Item,{as:l.b,to:"/",children:"Home"}),Object(O.jsx)(N.a,{item:!0,icon:"map",children:Object(O.jsxs)(N.a.Menu,{children:[Object(O.jsx)(N.a.Item,{children:"Area 1"}),Object(O.jsx)(N.a.Item,{children:"Area 2"})]})}),Object(O.jsxs)(I.a.Menu,{position:"right",children:[Object(O.jsx)(I.a.Item,{icon:"user",as:l.b,to:"/profile"}),Object(O.jsx)(I.a.Item,{children:Object(O.jsxs)(F.a,{basic:!0,dimmer:"inverted",onClose:()=>s(!1),onOpen:()=>s(!0),open:a,trigger:Object(O.jsx)(v.a,{style:{backgroundColor:"#87ba77"},children:"Login"}),className:"alignment",size:"mini",children:[Object(O.jsx)(w,{}),Object(O.jsx)(F.a.Actions,{className:"alignment",children:Object(O.jsx)(v.a,{size:"tiny",color:"black",onClick:()=>s(!1),children:"Cancel"})})]})}),Object(O.jsx)(I.a.Item,{children:Object(O.jsxs)(F.a,{basic:!0,dimmer:"inverted",onClose:()=>t(!1),onOpen:()=>t(!0),open:e,trigger:Object(O.jsx)(v.a,{style:{backgroundColor:"#6d97bd"},children:"Sign Up"}),size:"tiny",className:"alignment",children:[Object(O.jsx)(C,{}),Object(O.jsx)(F.a.Actions,{className:"alignment",children:Object(O.jsx)(v.a,{size:"tiny",color:"black",onClick:()=>t(!1),children:"Cancel"})})]})})]}),false]})};function z(){const[e,t]=Object(c.useState)(!1);return o.defaults.withCredentials=!0,Object(c.useEffect)((()=>{o.get("/login").then((e=>{!0===e.data.loggedIn&&t(e.data.user[0].firstname)}))})),Object(O.jsx)(l.a,{children:Object(O.jsxs)(c.Fragment,{children:[Object(O.jsxs)(j.a,{exact:!0,path:"/",children:[Object(O.jsx)(L,{}),Object(O.jsx)(h,{})]}),Object(O.jsxs)(j.c,{children:[Object(O.jsx)(j.a,{exact:!0,path:"/sign-up",children:Object(O.jsx)(C,{})}),Object(O.jsx)(j.a,{exact:!0,path:"/login",children:Object(O.jsx)(w,{})}),Object(O.jsx)(j.a,{exact:!0,path:"/profile",children:Object(O.jsx)(k,{})})]})]})})}r.a.render(Object(O.jsx)(l.a,{children:Object(O.jsx)(s.a.StrictMode,{children:Object(O.jsx)(z,{})})}),document.getElementById("root"))}},[[189,1,2]]]);
//# sourceMappingURL=main.5ad6c067.chunk.js.map