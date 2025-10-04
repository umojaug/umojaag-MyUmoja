import React, { useState, useMemo } from "react";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import { BiCheckbox, BiCheckboxSquare } from "react-icons/bi";
import { useGlobalContext } from "../../../hooks/context";

const getAllBranchIds = (nodes) => {
  const branchIds = [];
  const traverse = (node) => {
    if (node.isLeaf) {
      branchIds.push(node.key);
    }
    if (node.children) {
      node.children.forEach(traverse);
    }
  };
  nodes.forEach(traverse);
  return branchIds;
};

const getHeadOfficeBranchId = (nodes) => {
  let headOfficeBranchId = null;
  const traverse = (node) => {
    if (node.isLeaf && node.title === "Head office") {
      headOfficeBranchId = node.key;
      return;
    }
    if (node.children) {
      node.children.forEach(traverse);
    }
  };
  nodes.forEach(traverse);
  return headOfficeBranchId;
};

const buildTree = (data) => {
  const tree = {};

  data.forEach(
    ({ divisionName, regionName, areaName, branchName, branchId }) => {
      divisionName = divisionName.trim();
      regionName = regionName.trim();
      areaName = areaName.trim();

      if (!tree[divisionName]) {
        tree[divisionName] = {
          title: divisionName,
          key: divisionName,
          children: {},
        };
      }

      if (!tree[divisionName].children[regionName]) {
        tree[divisionName].children[regionName] = {
          title: regionName,
          key: regionName,
          children: {},
        };
      }

      if (!tree[divisionName].children[regionName].children[areaName]) {
        tree[divisionName].children[regionName].children[areaName] = {
          title: areaName,
          key: areaName,
          children: [],
        };
      }

      tree[divisionName].children[regionName].children[areaName].children.push({
        title: branchName,
        key: branchId,
        isLeaf: true,
      });
    }
  );

  return Object.values(tree).map((division) => ({
    ...division,
    children: Object.values(division.children).map((region) => ({
      ...region,
      children: Object.values(region.children),
    })),
  }));
};

const BranchTreeViewComponent = ({ onBranchSelect, viewFor = "MIS", list }) => {
  const [checkedKeys, setCheckedKeys] = useState(null);
  const value = useGlobalContext();

  const { treeData, allBranchIds, headOfficeBranchId } = useMemo(() => {
    if (!list?.data) {
      return { treeData: [], allBranchIds: [], headOfficeBranchId: null };
    }

    const tree = buildTree(list.data);
    const branchIds = getAllBranchIds(tree);
    const headOfficeId = getHeadOfficeBranchId(tree);

    return {
      treeData: tree,
      allBranchIds: branchIds,
      headOfficeBranchId: headOfficeId,
    };
  }, [list?.data]);

  const currentCheckedKeys = useMemo(() => {
    if (checkedKeys === null && allBranchIds.length > 0) {
      const initialKeys = allBranchIds;
      onBranchSelect(initialKeys);
      return initialKeys;
    }
    return checkedKeys || [];
  }, [checkedKeys, allBranchIds, onBranchSelect]);

  const allSelected =
    currentCheckedKeys.length === allBranchIds.length &&
    allBranchIds.length > 0;

  const headOfficeSelected =
    headOfficeBranchId &&
    currentCheckedKeys.length === 1 &&
    currentCheckedKeys[0] === headOfficeBranchId;

  const onCheck = (selectedKeys) => {
    const branchIds = selectedKeys.filter((key) => allBranchIds.includes(key));
    setCheckedKeys(branchIds);
    onBranchSelect(branchIds);
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setCheckedKeys([]);
      onBranchSelect([]);
    } else {
      setCheckedKeys(allBranchIds);
      onBranchSelect(allBranchIds);
    }
  };

  const handleSelectHeadOfficeOnly = () => {
    if (headOfficeSelected) {
      setCheckedKeys(allBranchIds);
      onBranchSelect(allBranchIds);
    } else {
      setCheckedKeys([headOfficeBranchId]);
      onBranchSelect([headOfficeBranchId]);
    }
  };

  return (
    <div>
      <div className="flex justify-between p-2">
        <label className="">Branches</label>
        <div className="flex gap-2">
          {viewFor === "FIS" &&
            (value.role !== "Regional Manager" ||
              value.role !== "Area Manager" ||
              value.role !== "Branch Manager" ||
              value.role !== "Loan Officer") && (
              <button onClick={handleSelectHeadOfficeOnly} type="button">
                {headOfficeSelected ? (
                  <span className="flex items-center">
                    <BiCheckboxSquare size={20} /> Unselect Head Office Only
                  </span>
                ) : (
                  <span className="flex items-center">
                    <BiCheckbox size={20} /> Select Head Office Only
                  </span>
                )}
              </button>
            )}
          <button onClick={handleSelectAll} type="button">
            {allSelected ? (
              <span className="flex items-center">
                <BiCheckboxSquare size={20} /> Unselect All Branches
              </span>
            ) : (
              <span className="flex items-center">
                <BiCheckbox size={20} /> Select All Branches
              </span>
            )}
          </button>
        </div>
      </div>
      <hr className="border-gray-300" />
      <div className="overflow-y-auto h-[350px] my-2 mx-2">
        <Tree
          checkable
          selectable={false}
          treeData={treeData}
          checkedKeys={currentCheckedKeys}
          onCheck={onCheck}
          showLine
          defaultExpandAll={true}
          key={`tree-${allBranchIds.length}`}
        />
      </div>
    </div>
  );
};

export default BranchTreeViewComponent;
