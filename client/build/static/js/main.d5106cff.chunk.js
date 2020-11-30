(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{25:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){"use strict";n.r(t);var c=n(0),s=n(1),a=n.n(s),i=n(18),o=n.n(i),r=(n(25),n(3)),l=n(2),j=n(5),h=function(){var e=Object(s.useState)([]),t=Object(r.a)(e,2),n=t[0],a=t[1],i=Object(s.useContext)(v),o=i.state;i.dispatch;return Object(s.useEffect)((function(){fetch("/mypost",{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){return e.json()})).then((function(e){a(e.mypost)}))}),[]),Object(c.jsxs)("div",{className:"profile",children:[Object(c.jsxs)("div",{className:"profileLand",children:[Object(c.jsx)("div",{className:"profilePic",children:Object(c.jsx)("img",{src:"https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80"})}),Object(c.jsxs)("div",{children:[Object(c.jsx)("h3",{children:o?o.name:"loading"}),Object(c.jsx)("h5",{children:"email"}),Object(c.jsxs)("div",{className:"followState",children:[Object(c.jsx)("p",{children:"1 pics"}),Object(c.jsx)("p",{children:"1 followers"}),Object(c.jsx)("p",{children:"1 following"})]})]})]}),Object(c.jsx)("div",{className:"gallery",children:n.map((function(e){return Object(c.jsx)("img",{src:e.photo},e.title)}))})]})},d=function(){var e=Object(s.useContext)(v),t=e.state,n=e.dispatch,a=Object(l.e)();return Object(c.jsx)("nav",{children:Object(c.jsxs)("div",{className:"nav-wrapper white",children:[Object(c.jsx)(j.b,{to:t?"/":"/login",className:"brand-logo left",children:"Instagram"}),Object(c.jsx)("ul",{id:"nav-mobile",className:"right",children:t?[Object(c.jsx)("li",{children:Object(c.jsx)(j.b,{to:"/profile",children:"Profile"})}),Object(c.jsx)("li",{children:Object(c.jsx)(j.b,{to:"/create",children:"Create Post"})}),Object(c.jsx)("li",{children:Object(c.jsx)("button",{className:"btn waves-effect waves-light",onClick:function(){localStorage.clear(),n({type:"CLEAR"}),a.push("/login")},children:"LogOut"})})]:[Object(c.jsx)("li",{children:Object(c.jsx)(j.b,{to:"/login",children:"Login"})}),Object(c.jsx)("li",{children:Object(c.jsx)(j.b,{to:"/signup",children:"SignUp"})})]})]})})},u=(n(30),function(){var e=Object(s.useState)([]),t=Object(r.a)(e,2),n=t[0],a=t[1],i=Object(s.useContext)(v),o=i.state;i.dispatch;Object(s.useEffect)((function(){fetch("/allpost",{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){return e.json()})).then((function(e){a(e.posts)}))}),[]);return Object(c.jsx)("div",{className:"home",children:n.map((function(e){return Object(c.jsxs)("div",{className:"homeposts",children:[Object(c.jsx)("h4",{children:Object(c.jsx)(j.b,{to:e.postedBy._id!==o._id?"/profile/"+e.postedBy._id:"/profile",children:e.postedBy.name})}),e.postedBy._id===o._id&&Object(c.jsx)("i",{className:"material-icons",style:{float:"right"},onClick:function(){return t=e._id,void fetch("/deletepost/".concat(t),{method:"delete",headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){return e.json()})).then((function(e){var t=n.filter((function(t){return t._id!==e._id}));a(t)}));var t},children:"delete"}),Object(c.jsx)("div",{className:"homeImage",children:Object(c.jsx)("img",{src:e.photo})}),Object(c.jsxs)("div",{children:[e.likes.includes(o._id)?Object(c.jsx)("i",{className:"material-icons",onClick:function(){var t;t=e._id,fetch("/unlike",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({postId:t})}).then((function(e){return e.json()})).then((function(e){var t=n.map((function(t){return t._id===e._id?e:t}));a(t)})).catch((function(e){console.log(e)}))},children:"thumb_down"}):Object(c.jsx)("i",{className:"material-icons",onClick:function(){var t;t=e._id,fetch("/like",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({postId:t})}).then((function(e){return e.json()})).then((function(e){var t=n.map((function(t){return t._id===e._id?e:t}));a(t)})).catch((function(e){console.log(e)}))},children:"thumb_up"}),Object(c.jsx)("span",{className:"like-count",children:e.likes.length}),Object(c.jsx)("p",{children:e.title}),Object(c.jsx)("p",{children:e.body}),e.comments.map((function(e){return Object(c.jsxs)("p",{children:[Object(c.jsxs)("span",{style:{fontWeight:"500"},children:[e.postedBy.name," "]}),e.text]},e._id)})),Object(c.jsx)("form",{onSubmit:function(t){var c,s;t.preventDefault(),c=t.target[0].value,s=e._id,fetch("/comment",{method:"put",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({postId:s,text:c})}).then((function(e){return e.json()})).then((function(e){var t=n.map((function(t){return t._id===e._id?e:t}));a(t)})).catch((function(e){console.log(e)}))},children:Object(c.jsx)("input",{type:"text",placeholder:"comment"})})]})]},e._id)}))})}),b=n(9),p=n.n(b),O=function(){var e=Object(s.useContext)(v),t=(e.state,e.dispatch),n=Object(l.e)(),a=Object(s.useState)(""),i=Object(r.a)(a,2),o=i[0],h=i[1],d=Object(s.useState)(""),u=Object(r.a)(d,2),b=u[0],O=u[1];return Object(c.jsx)("div",{className:"mycard",children:Object(c.jsxs)("div",{className:"card auth-card",children:[Object(c.jsx)("h2",{children:"Instagram"}),Object(c.jsx)("input",{type:"text",placeholder:"email",value:b,onChange:function(e){return O(e.target.value)}}),Object(c.jsx)("input",{type:"password",placeholder:"password",value:o,onChange:function(e){return h(e.target.value)}}),Object(c.jsx)("button",{className:"btn waves-effect waves-light",onClick:function(){fetch("/signin",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:o,email:b})}).then((function(e){return e.json()})).then((function(e){e.error?p.a.toast({html:e.error}):(localStorage.setItem("jwt",e.token),localStorage.setItem("user",JSON.stringify(e.user)),t({type:"USER",payload:e.user}),p.a.toast({html:"login successfully"}),n.push("/"))})).catch((function(e){console.log(e)}))},children:"Login"}),Object(c.jsx)("h5",{children:Object(c.jsx)(j.b,{to:"/signup",children:"Don't have an account ?"})})]})})},f=function(){var e=Object(l.e)(),t=Object(s.useState)(""),n=Object(r.a)(t,2),a=n[0],i=n[1],o=Object(s.useState)(""),h=Object(r.a)(o,2),d=h[0],u=h[1],b=Object(s.useState)(""),O=Object(r.a)(b,2),f=O[0],x=O[1],m=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(d),g=/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(f);return Object(c.jsx)("div",{className:"mycard",children:Object(c.jsxs)("div",{className:"card auth-card",children:[Object(c.jsx)("h2",{children:"Instagram"}),Object(c.jsx)("input",{type:"text",placeholder:"name",value:a,onChange:function(e){return i(e.target.value)}}),Object(c.jsx)("input",{type:"text",placeholder:"email",value:f,onChange:function(e){return x(e.target.value)}}),Object(c.jsx)("input",{type:"password",placeholder:"password",value:d,onChange:function(e){return u(e.target.value)}}),Object(c.jsx)("button",{className:"btn waves-effect waves-light",onClick:function(){g&&m?fetch("/signup",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:a,password:d,email:f})}).then((function(e){return e.json()})).then((function(t){t.error?p.a.toast({html:t.error}):(p.a.toast({html:t.message}),e.push("/login"))})).catch((function(e){console.log(e)})):p.a.toast({html:"Enter valid email address or password(password should between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter)"})},children:"Signup"}),Object(c.jsx)("h5",{children:Object(c.jsx)(j.b,{to:"/login",children:"Already have an account ?"})})]})})},x=function(){var e=Object(l.e)(),t=Object(s.useState)(""),n=Object(r.a)(t,2),a=n[0],i=n[1],o=Object(s.useState)(""),j=Object(r.a)(o,2),h=j[0],d=j[1],u=Object(s.useState)(""),b=Object(r.a)(u,2),O=b[0],f=b[1],x=Object(s.useState)(""),m=Object(r.a)(x,2),g=m[0],v=m[1];Object(s.useEffect)((function(){g&&fetch("/createpost",{method:"post",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({title:a,body:h,pic:g})}).then((function(e){return e.json()})).then((function(t){t.error?p.a.toast({html:t.error}):(p.a.toast({html:"posted successfully"}),e.push("/"))})).catch((function(e){console.log(e)}))}),[g]);return Object(c.jsxs)("div",{className:"createPost",children:[Object(c.jsx)("input",{type:"text",placeholder:"title",value:a,onChange:function(e){return i(e.target.value)}}),Object(c.jsx)("input",{type:"text",placeholder:"body",value:h,onChange:function(e){return d(e.target.value)}}),Object(c.jsxs)("div",{className:"file-field input-field",children:[Object(c.jsxs)("div",{className:"btn",children:[Object(c.jsx)("span",{children:"File"}),Object(c.jsx)("input",{type:"file",onChange:function(e){return f(e.target.files[0])}})]}),Object(c.jsx)("div",{className:"file-path-wrapper",children:Object(c.jsx)("input",{className:"file-path validate",type:"text"})}),Object(c.jsx)("button",{className:"btn waves-effect waves-light postbtn",onClick:function(){return function(){var e=new FormData;e.append("file",O),e.append("upload_preset","insta-clone"),e.append("cloud_name","panther123"),fetch("https://api.cloudinary.com/v1_1/panther123/image/upload",{method:"post",body:e}).then((function(e){return e.json()})).then((function(e){v(e.url)})).catch((function(e){console.log(e)}))}()},children:"post"})]})]})},m=function(e,t){return"USER"==t.type?t.payload:"CLEAR"==t.type?null:e},g=function(){var e=Object(s.useState)(null),t=Object(r.a)(e,2),n=t[0],a=t[1],i=Object(s.useContext)(v),o=(i.state,i.dispatch,Object(l.f)().userid);return Object(s.useEffect)((function(){fetch("/user/".concat(o),{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){return e.json()})).then((function(e){a(e)}))}),[]),Object(c.jsx)(c.Fragment,{children:n?Object(c.jsxs)("div",{className:"profile",children:[Object(c.jsxs)("div",{className:"profileLand",children:[Object(c.jsx)("div",{className:"profilePic",children:Object(c.jsx)("img",{src:"https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80"})}),Object(c.jsxs)("div",{children:[Object(c.jsx)("h3",{children:n.user.name}),Object(c.jsx)("h5",{children:n.user.email}),Object(c.jsxs)("div",{className:"followState",children:[Object(c.jsx)("p",{children:n.posts.length}),Object(c.jsx)("p",{children:"1 followers"}),Object(c.jsx)("p",{children:"1 following"})]})]})]}),Object(c.jsx)("div",{className:"gallery",children:n.posts.map((function(e){return Object(c.jsx)("img",{src:e.photo},e._id)}))})]}):Object(c.jsx)("h3",{children:"loading..."})})},v=Object(s.createContext)(),y=function(){var e=Object(l.e)(),t=Object(s.useContext)(v),n=(t.state,t.dispatch);return Object(s.useEffect)((function(){var t=JSON.parse(localStorage.getItem("user"));t?n({type:"USER",payload:t}):e.push("/login")}),[]),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(l.a,{exact:!0,path:"/",children:Object(c.jsx)(u,{})}),Object(c.jsx)(l.a,{path:"/login",children:Object(c.jsx)(O,{})}),Object(c.jsx)(l.a,{path:"/signup",children:Object(c.jsx)(f,{})}),Object(c.jsx)(l.a,{exact:!0,path:"/profile",children:Object(c.jsx)(h,{})}),Object(c.jsx)(l.a,{path:"/create",children:Object(c.jsx)(x,{})}),Object(c.jsx)(l.a,{path:"/profile/:userid",children:Object(c.jsx)(g,{})})]})};var w=function(){var e=Object(s.useReducer)(m,null),t=Object(r.a)(e,2),n=t[0],a=t[1];return Object(c.jsx)(v.Provider,{value:{state:n,dispatch:a},children:Object(c.jsxs)(j.a,{children:[Object(c.jsx)(d,{}),Object(c.jsx)(y,{})]})})},S=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,32)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),s(e),a(e),i(e)}))};o.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(w,{})}),document.getElementById("root")),S()}},[[31,1,2]]]);
//# sourceMappingURL=main.d5106cff.chunk.js.map