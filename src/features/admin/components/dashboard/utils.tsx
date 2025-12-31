'use client';


// Facebook URL Validation
export const isValidFacebookUrl = (url: string) => {
    if (!url) return false;
    const fbRegex = /^(https?:\/\/)?(www\.)?(facebook|fb)\.com\/(profile\.php\?id=\d+|[a-zA-Z0-9\.]+\/?)$/;
    return fbRegex.test(url);
};

// Author Cell Component
export const AuthorCell = ({ author }: { author: any }) => (
    <span className="text-zinc-500 text-sm whitespace-nowrap">{author || 'DIC Admin'}</span>
);
