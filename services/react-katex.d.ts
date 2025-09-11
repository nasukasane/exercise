declare module 'react-katex' {
    import { ReactNode, ComponentType } from 'react';
  
    export interface KatexProps {
        math?:     string;
        children?: ReactNode;
    }
  
    export const InlineMath: ComponentType<KatexProps>;
    export const BlockMath: ComponentType<KatexProps>;
}