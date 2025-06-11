import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'; // Example icons

interface DataWidgetProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ElementType;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  footerLink?: {
    text: string;
    href: string;
  };
  className?: string;
}

const DataWidget: React.FC<DataWidgetProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  footerLink,
  className,
}) => {
  console.log("Rendering DataWidget:", title);

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-muted-foreground';

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
        {trend && trendValue && (
          <div className={`mt-1 flex items-center text-xs ${trendColor}`}>
            <TrendIcon className="mr-1 h-4 w-4" />
            {trendValue}
          </div>
        )}
      </CardContent>
      {footerLink && (
        <CardFooter>
          <a href={footerLink.href} className="text-xs text-blue-500 hover:underline">
            {footerLink.text}
          </a>
        </CardFooter>
      )}
    </Card>
  );
};
export default DataWidget;