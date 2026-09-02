import { ThemeProvider } from "./components/theme-provider";
import { ThemeSwitcher } from "./components/custom/theme-switcher";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { QueryForm } from "./components/custom/query";
import { Footer } from "./components/custom/footer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BadgeAlert } from "lucide-react";

function App() {
  return (
    <ThemeProvider storageKey="phantomports-theme">
      <Card className="border-0 w-[100vw] shadow-none lg:w-[768px] lg:border lg:shadow-sm">
        <CardHeader className="flex flex-row justify-between space-y-0">
          <div>
            <CardTitle className="text-3xl font-heading text-accent">
              Phantom Ports
            </CardTitle>
            <p className="font-heading relative -top-2">
              Lookup unregistered ports
            </p>
          </div>
          <ThemeSwitcher />
        </CardHeader>
        <CardContent>
          <QueryForm />
          <Alert className="mt-6" variant="warning">
            <BadgeAlert className="w-4 h-4" />
            <AlertTitle>Deprecation notice</AlertTitle>
            <AlertDescription>
              This project has been migrated to{" "}
              <a href="https://opor.top">opor.top</a>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Footer className="mt-6" />
    </ThemeProvider>
  );
}

export default App;
