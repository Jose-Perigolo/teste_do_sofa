export default interface SofaProps {
    _id: string;
    imageUrl: string;
    type: string;
    seats?: number;
    length?: number;
    width?: number;
    depth?: number;
    updatedAt?: string;
    posrates?: string[];
    negrates?: string[];
}