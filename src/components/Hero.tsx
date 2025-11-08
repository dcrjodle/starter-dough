import { Card } from "./Card";
import { Typography } from "./Typography";

export interface HeroProps {
  title?: string;
  description?: string;
  className?: string;
}

export function Hero({
  title = "Welcome to Our Platform",
  description = "Build amazing things with our simple and powerful tools.",
  className,
}: HeroProps) {
  return (
    <Card
      variant="transparent"
      padding="40px 20px"
      direction="column"
      gap={16}
      className={`md:py-20 md:px-8 lg:py-24 w-full ${className}`}
      testId="hero"
    >
      <Typography
        variant="h1"
        weight="bold"
        align="center"
        className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl px-4"
      >
        {title}
      </Typography>
      <Typography
        variant="p1"
        align="center"
        className="text-sm md:text-base lg:text-lg px-4 md:px-8"
      >
        {description}
      </Typography>
    </Card>
  );
}
