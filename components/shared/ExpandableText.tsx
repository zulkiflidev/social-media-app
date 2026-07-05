import { useState } from 'react';


interface ExpandableTextProps {
  text: string;
  max?: number;  

}



export default function ExpandableText({ text, max = 150 }: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!text || text.length <= max) return <p className="text-sm"> {text}  </p>;

  return (

    <div className="flex flex-col gap-2 items-start text-sm">
        <p className="text-sm">
            {
                isExpanded ? text : `${text.substring(0, max)}...`
            }
        </p> 

        <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="text-blue-500 font-medium  hover:underline"
        >
            {
                isExpanded ? 'Show less' : 'Read more'
            }

        </button>         
    </div>
  );
}