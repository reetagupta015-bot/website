import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function CompleteProfileModal() {
  const { user, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  // Local state for the form
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (!authLoading && !profileLoading && user && profile) {
      // If the user's profile is missing an age, force the modal open
      if (profile.age === null || profile.age === undefined) {
        setFullName(profile.full_name || user.user_metadata?.full_name || "");
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
  }, [authLoading, profileLoading, user, profile]);

  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error("No user ID");
      const parsedAge = parseInt(age, 10);
      if (isNaN(parsedAge) || parsedAge < 13 || parsedAge > 120) {
        throw new Error("Please enter a valid age between 13 and 120.");
      }
      
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName.trim() || null,
          age: parsedAge,
        })
        .eq("id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
      // The modal will auto-close because profile.age is no longer null on the next query
      setOpen(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate();
  };

  // Do not render anything if the modal shouldn't be open
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border w-full max-w-md p-8 shadow-xl">
        <div className="text-center mb-6">
          <h2 className="font-serif text-3xl">Complete Your Profile</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Just a few more details to finalize your account setup.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Full Name</label>
            <input
              required
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Jane Doe"
              className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">Your Age</label>
            <input
              required
              type="number"
              min="13"
              max="120"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g. 28"
              className="w-full bg-background border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          
          <button
            type="submit"
            disabled={updateProfileMutation.isPending}
            className="w-full bg-foreground text-background py-3 text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 mt-6"
          >
            {updateProfileMutation.isPending ? "Saving..." : "Save Details"}
          </button>
        </form>
      </div>
    </div>
  );
}
