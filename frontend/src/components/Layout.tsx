import type { PropsWithChildren } from "react";
import Contact from "../features/components/Contact";
import Experiences from "../features/components/Experiences";
import Projects from "../features/components/Projects";
import Student from "../features/components/Student";
import CreateProject from "../features/components/CreateProject";


type LayoutProps = PropsWithChildren;

export default function Layout(props: LayoutProps) {
    const { children } = props;

    return (
        <> 
        <main className="container">
        {children}
        </main>
        
        </>
      );
}