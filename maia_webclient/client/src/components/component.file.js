import React from 'react'
import { Tree } from 'antd';

const { DirectoryTree } = Tree;

const treeData = [
    {
      title: 'My Files',
      key: '0-0',
      children: [
        {
          title: 'leaf 0-0',
          key: '0-0-0',
          isLeaf: true,
        },
        {
          title: 'leaf 0-1',
          key: '0-0-1',
          isLeaf: true,
        },
      ],
    },
  ];

const File = ()=>{
    const onSelect = (keys, info) => {
        console.log('Trigger Select', keys, info);
        };

    const onExpand = () => {
        console.log('Trigger Expand');
          };

    return (
        <DirectoryTree
          multiple
          defaultExpandAll
          onSelect={onSelect}
          onExpand={onExpand}
          treeData={treeData}
        />
      );
};
export default File;