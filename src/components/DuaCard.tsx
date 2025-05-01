import { Card, Divider } from "antd";
import { Dua } from "../types";

/**
 * If you want hover feature, make sure to add 'group' to className in parent div
 */
type DuaCardProps = {
  title?: string;
  dua: Dua;
};
export default function DuaCard({ dua }: DuaCardProps) {
  return (
    <Card
      hoverable
      title={<div className="group-hover:text-violet-300">{dua.title}</div>}
    >
      <div className="group-hover:text-violet-300">
        <p className="text-sm">{dua.arabic}</p>
        <p className="text-sm">{dua.translation}</p>
        <Divider className="my-2" />
        <p className="text-sm text-neutral-500">{dua.source}</p>
      </div>
    </Card>
  );
}
