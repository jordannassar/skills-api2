export interface post {
    id: number;
    title: string;
    details: string;
    userId: number;
    type: number;
    categoryId: number;
    postLink: Array<string>;
    searchIndex: Array<string>;
}