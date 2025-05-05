import { Card } from "antd";
import { ReactNode } from "react";

/**
 * If you want hover feature, make sure to add 'group' to className in parent div
 */
type DuaCardProps = {
  onClick?: () => void;
  cardContent: {
    title: ReactNode;
    content: ReactNode;
  };
};
export default function ColumnCard({ cardContent, onClick }: DuaCardProps) {
  return (
    <Card
      onClick={onClick}
      hoverable
      title={
        <div className="group-hover:text-violet-300">{cardContent.title}</div>
      }
    >
      <p className="text-sm">{cardContent.content}</p>
    </Card>
  );
}
