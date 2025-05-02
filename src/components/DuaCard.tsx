import { Card } from "@chakra-ui/react";
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
    <Card.Root>
      <Card.Body className="group-hover:text-violet-300" gap="2">
        <Card.Title className="">{dua.title}</Card.Title>
        <Card.Description className="group-hover:text-violet-300">
          <span>{dua.arabic}</span>
          <span>{dua.translation}</span>
        </Card.Description>
        <Card.Footer>
          <p className="group-hover:text-violet-300">{dua.source}</p>
        </Card.Footer>
      </Card.Body>
    </Card.Root>
  );
}
