import { reactExports, jsxRuntimeExports } from "./server-UVxo8XOe.mjs";
import { useNavigate, supabase } from "./router-DSO1t1MA.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function AuthCallback() {
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    supabase.auth.getSession().then(({
      data
    }) => {
      if (data.session) {
        navigate({
          to: "/"
        });
      } else {
        const {
          data: listener
        } = supabase.auth.onAuthStateChange((event, session) => {
          if (session) {
            navigate({
              to: "/"
            });
          }
        });
        return () => listener.subscription.unsubscribe();
      }
    });
  }, [navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-screen w-full items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "Completing login..." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Please wait a moment while we authenticate you." })
  ] }) });
}
export {
  AuthCallback as component
};
