import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';


interface FileNode {
  name: string;
  type: string;
  path: string;
  children?: FileNode[];
}

interface FileFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

// src/app/tree-view.model.ts
export interface TreeNode {
  name: string;
  type: 'folder' | 'file';
  path: string;
  children?: TreeNode[];
}


// const TREE_DATA: FileNode[] = [
//   {
//     name: 'src',
//     type: 'folder',
//     children: [
//       { name: 'app', type: 'folder', children: [{ name: 'app.component.ts', type: 'file' }, { name: 'app.module.ts', type: 'file' }] },
//       { name: 'assets', type: 'folder', children: [] },
//       { name: 'index.html', type: 'file' },
//       { name: 'main.ts', type: 'file' },
//     ],
//   },
//   {
//     name: 'angular.json',
//     type: 'file',
//   },
// ];



@Component({
  selector: 'app-directory-tree',
  templateUrl: './directory-tree.component.html',
  styleUrls: ['./directory-tree.component.css']
})
export class DirectoryTreeComponent implements OnInit {
  @Output() fileSelected = new EventEmitter<string>();
  TREE_DATA: FileNode[] = [];
  private _transformer = (node: FileNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<FileFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  // treeControl = new NestedTreeControl<FileNode>(node => node.level);
  // dataSource = new MatTreeNestedDataSource<FileNode>();
  @Input() treeData: TreeNode[] = [];
  constructor(private http: HttpClient,) {

  }
  ngOnInit(): void {
    // this.dataSource.data = TREE_DATA;
    this.http.get('http://localhost:8080/code-preview/structure').subscribe((data: any) => {
      //this.dataSource.data = data;
      this.treeData = data;
    });
  }

  hasChild = (_: number, node: FileNode) => !!node.children && node.children.length > 0;

  onFileClick(node: any) {
    console.log(node)
    if (node.type === 'file')
      this.fileSelected.emit(node.path);
  }
  expandedNodes: Set<TreeNode> = new Set();
  toggleNode(node: TreeNode): void {
    if (this.expandedNodes.has(node)) {
      this.expandedNodes.delete(node);
    } else {
      this.expandedNodes.add(node);
    }
  }

  isExpanded(node: TreeNode): boolean {
    return this.expandedNodes.has(node);
  }
}
