import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const PillLabel = ({ href, text, style }: { href: string, text: string, style?: string }) => {
    return (
        <Link href={href} className={`group inline-flex border border-amber-200 px-4 rounded-3xl hover:bg-brass hover:text-charcoal! items-center gap-2 text-brass transition-all duration-500 ${style}`}>
            {text}
            <ArrowUpRight size={15} className="group-hover:rotate-45 transition-all duration-500" />
        </Link>
    );
}
 
export default PillLabel;