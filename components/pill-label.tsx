import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const PillLabel = ({ href, text, style }: { href: string, text: string, style?: string }) => {
    return (
        <Link href={href} className={`group micro-link micro-press mt-8 inline-flex items-center gap-2 rounded-full border border-brass px-5 py-2.5 text-sm text-white! transition hover:bg-brass! duration-150 ${style}`}>
            {text}
            <ArrowUpRight size={14} />
        </Link>
    );
}
 
export default PillLabel;