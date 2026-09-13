import React from 'react';
import { CategoryNav } from './CategoryNav';
import { Language, CategoryGroupId } from '../types';

interface HashtagExplorerProps {
  language: Language;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  selectedGroup: CategoryGroupId;
  onSelectGroup: (group: CategoryGroupId) => void;
  productCountByTag: Record<string, number>;
}

export const HashtagExplorer: React.FC<HashtagExplorerProps> = (props) => {
  return <CategoryNav {...props} />;
};

export { CategoryNav };
