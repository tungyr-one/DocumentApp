import { Category } from './../_models/Category';
export class DynamicFlatNode {
  constructor(
    public item: Category,
    public level = 1,
    public expandable = false,
    public isLoading = false,
  ) {}
}
