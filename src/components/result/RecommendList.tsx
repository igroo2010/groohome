interface RecommendItem {
  id: string;
  recommended_destination: string;
  session_id: string;
  likes: number;
}

type RecommendListProps = {
  list: RecommendItem[];
  onSelect: (id: string) => void;
};

export default function RecommendList({ list, onSelect }: RecommendListProps) {
  //console.log('RecommendList list:', list);
  if (!Array.isArray(list) || !list.length) return null;
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8 px-2 w-full max-w-2xl mx-auto">
      {list.slice(0, 15).map((item: RecommendItem) => {
        //console.log('RecommendList item:', item);
        return (
          <button
            key={item.id}
            className="bg-[#f3f1ee] rounded-full px-5 py-2 text-base font-semibold flex items-center gap-1 whitespace-nowrap transition-colors duration-200 hover:bg-accent/20 active:bg-accent/30 focus:outline-none min-w-[100px] min-h-[40px]"
            onClick={() => onSelect(item.id)}
          >
            {item.recommended_destination}
            <span className="text-xs text-accent font-bold ml-1">({item.likes})</span>
          </button>
        );
      })}
    </div>
  );
} 