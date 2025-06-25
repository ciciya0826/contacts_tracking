import * as React from "react";
import * as ReactDOM from "react-dom/client"
import { 
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root,{
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import ErrorPage from "./error-page";
import Contact,{
  loader as contactLoader,
} from "./routes/contact";
import EditContact,{
  action as editAction,
} from "./routes/edit";
import {action as destroyAction} from "./routes/destroy";
import Index from "./routes";

const router = createBrowserRouter([
  {
    path:"/", //该路由匹配的URL路径
    element:<Root />,  //路径匹配时要渲染的React元素
    errorElement:<ErrorPage />, //报错时渲染的内容
    loader:rootLoader,  //组件渲染前执行的数据预加载函数
    action:rootAction,  //处理表单提交等数据变更的函数
    children:[
      {index:true,element:<Index />}, //根路由没有渲染子路由时  默认
      //将联系人路由作为根路由的子路由(要通过<Outlet>告诉在何处渲染子路由)root.jsx中
      {
        path:"contacts/:contactId", // :contact是动态参数占位符，这个位置的内容可以是任意值
        element:<Contact />,
        loader:contactLoader,
      },
      {
        path:"contacts/:contactId/edit",
        element:<EditContact />,
        loader:contactLoader,
        action:editAction,
      },
      {
        path:"contacts/:contactId/destroy",
        action:destroyAction,
        errorElement:<div>Oops!There was an error.</div>,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)