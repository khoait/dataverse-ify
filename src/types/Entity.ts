import { Dictionary } from "./Dictionary";
import { getEntitySetName } from "../metadata/MetadataCache";
import { IEntity } from "./IEntity";
import { EntityReference } from "./EntityReference";
export class Entity {
  static containsFields(instance: Dictionary<unknown>, keys: string[]): boolean {
    let allOk = true;
    for (const key of keys) {
      allOk = allOk && instance[key] != undefined;
      if (!allOk) break;
    }
    return allOk;
  }
  static async getCollectionNameForEntity(logicalName: string): Promise<string> {
    // Try using the simple collection name lookup
    const collectionName = await getEntitySetName(logicalName);
    return collectionName;
  }
  static toEntityReference(instance: IEntity): EntityReference {
    return new EntityReference(instance.logicalName, instance.id);
  }
}
