import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";

export function AnimatedGridPatternDemo({ className }) {
    return (
        <div className={cn("absolute inset-0 -z-0 pointer-events-none", className)}>
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.25}       // Increase opacity for visibility
                duration={3}
                repeatDelay={1}
                className={cn(
                    "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                    "inset-0 h-full w-full"
                )}
            />
        </div>
    );
}
