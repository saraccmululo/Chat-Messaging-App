# Chat-App
Project URL https://chat-messaging-app-kappa.vercel.app/
Built a Chat Message App following a React course tutorial. Utilized React Query, React Hook Form, React Route, Zustand, and Supabase.


NOTE: Improved the useQuery queryFn function by rewriting the original function without using the ! non-null assertion.

ORIGINAL- queryFn: ()=> 
            currentRoom?.id===null? Promise.resolve([]) : fetchMessages(currentRoom!.id)
This silences TypeScript errors about possibly accessing a property on a null or undefined object. But it doesn’t change runtime behavior — if you're wrong and currentRoom is undefined, you can get a crash.

MY VERSION- queryFn: () => {
              if (!currentRoom || currentRoom.id === null) {
                return Promise.resolve([]);
              }
              return fetchMessages(currentRoom.id);
            }
This version is more readable, safer at runtime, and respects TypeScript’s warnings without needing to override them.
