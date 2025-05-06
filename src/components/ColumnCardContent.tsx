import { Divider } from "antd";
import { Dua } from "../types";

type DuaCardContentProps = {
  dua: Dua;
};
export default function DuaCardContent({ dua }: DuaCardContentProps) {
  return (
    <div className="group-hover:text-violet-300">
      <p className="text-sm">{dua.arabic}</p>
      <p className="text-sm">{dua.translation}</p>
      <Divider className="my-2" />
      <p className="text-sm text-neutral-500">{dua.source}</p>
    </div>
  );
}
