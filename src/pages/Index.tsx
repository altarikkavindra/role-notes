import { Button } from "@/components/ui/button";
import { StickyNote, Shield, Edit, Eye, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Admin Role",
      description: "Full control - create, edit, delete, and manage all notes",
      color: "text-destructive",
    },
    {
      icon: Edit,
      title: "Editor Role",
      description: "Create and modify notes with collaborative access",
      color: "text-primary",
    },
    {
      icon: Eye,
      title: "Viewer Role",
      description: "Read-only access to view and browse all notes",
      color: "text-muted-foreground",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-soft">
              <StickyNote className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">Private Notes</span>
          </div>
          <Button onClick={() => navigate("/auth")} variant="outline">
            Get Started
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-3xl shadow-elegant mb-6">
            <StickyNote className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Secure Note-Taking with
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Role-Based Access
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A powerful SaaS-style notes application with built-in authentication and role management.
            Perfect for teams and organizations.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="shadow-elegant"
            >
              Start Taking Notes
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-border shadow-soft hover:shadow-elegant transition-all duration-300"
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-card flex items-center justify-center mb-4 ${feature.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="text-left">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        <div className="mt-20 text-center max-w-3xl mx-auto">
          <Card className="border-border shadow-soft">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to get started?</CardTitle>
              <CardDescription className="text-base">
                Create your account now and start organizing your notes with powerful role-based access control.
                New users automatically get Viewer access.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" onClick={() => navigate("/auth")} className="shadow-elegant">
                Create Free Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Private Notes. Built with role-based security.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
