import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate({ to: "/" });
      } else {
        // Sometimes it takes a moment to process the #access_token or ?code=
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
          if (session) {
            navigate({ to: "/" });
          }
        });
        return () => listener.subscription.unsubscribe();
      }
    });
  }, [navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Completing login...</h2>
        <p className="text-sm text-muted-foreground">Please wait a moment while we authenticate you.</p>
      </div>
    </div>
  );
}
