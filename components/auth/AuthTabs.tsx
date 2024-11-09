import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthTabs() {
  return (
    <Tabs defaultValue="signIn" className="w-[400px] font-mono">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signIn">Sign In</TabsTrigger>
        <TabsTrigger value="signUp">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="signIn">
        <LoginForm />
      </TabsContent>
      <TabsContent value="signUp">
        <RegisterForm />
      </TabsContent>
    </Tabs>
  );
}
