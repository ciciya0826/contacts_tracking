import { 
    Outlet,
    NavLink,
    Link,
    useLoaderData,  //用于获取通过loader函数加载的数据
    Form,   //特殊的表单组件
    redirect,
    useNavigation,
 } from "react-router-dom";
import { getContacts,createContact } from "../contacts";

//async异步函数
export async function loader({request}) {
    const url = new URL(request.url);   //转为URL对象实例
    const q = url.searchParams.get("q");    //获取名为q的查询参数的值
    const contacts = await getContacts(q);   //getContacts函数可能涉及到异步操作，所以要用await
    return {contacts};
}

export async function action(){
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`)
}

export default function Root() {
    const {contacts} = useLoaderData(); //useLoaderData钩子获取路由loader加载好的数据并解构出contacts
    const navigation = useNavigation();

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    <Link to={`contacts/${contact.id}`}>
                        {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                        ) : (
                        <i>No Name</i>
                        )}{" "}
                        {contact.favorite && <span>★</span>}
                    </Link>
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div 
        id="detail"
        className={
            navigation.state === "loading"?"loading" : ""
        }
      >
        <Outlet />
      </div>
    </>
  );
}
