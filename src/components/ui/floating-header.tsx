import React, { useEffect } from 'react';
import { MenuIcon, ArrowRight } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter } from './sheet';
import { Button, buttonVariants } from './button';
import { cn } from '../../lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type NavLink = {
	name: string;
	path: string;
	hash?: string;
};

export function FloatingHeader() {
	const [open, setOpen] = React.useState(false);
	const { t, i18n } = useTranslation();
	const [lang, setLang] = React.useState<'EN' | 'FR'>(i18n.language.toUpperCase().startsWith('FR') ? 'FR' : 'EN');
	const location = useLocation();

	useEffect(() => {
		const currentLang = i18n.language.toUpperCase().startsWith('FR') ? 'FR' : 'EN';
		if (lang !== currentLang) {
			setLang(currentLang);
		}
	}, [i18n.language]);

	const handleLangChange = (newLang: 'EN' | 'FR') => {
		setLang(newLang);
		i18n.changeLanguage(newLang.toLowerCase());
	};

	const links: NavLink[] = [
		{ name: t('nav.home'), path: '/' },
		{ name: t('nav.about'), path: '/about' },
		{ name: t('nav.services'), path: '/services' },
		{ name: t('nav.portfolio'), path: '/portfolio' },
		{ name: t('nav.testimonials'), path: '/', hash: '#testimonials' },
		{ name: t('nav.contact'), path: '/contact' },
	];

	return (
		<header
			className={cn(
				'mx-auto w-full max-w-7xl rounded-full border border-gray-200 shadow-lg',
				'bg-white/95 supports-[backdrop-filter]:bg-white/90 backdrop-blur-md',
			)}
		>
			<nav className="mx-auto flex items-center justify-between p-2">
				{/* Logo Section */}
				<Link to="/" className="flex items-center gap-3 px-2 hover:opacity-90 transition-opacity">
					<img 
						src="/logo.png" 
						alt="Trisalex Logo" 
						className="h-[4.5rem] sm:h-16 md:h-[4.5rem] w-auto object-contain" 
						onError={(e) => {
							e.currentTarget.style.display = 'none';
							e.currentTarget.nextElementSibling?.classList.remove('hidden');
						}}
					/>
					<div className="hidden sm:block">
						<p className="font-sans text-xl font-extrabold text-gray-900 tracking-tight">Trisalex</p>
					</div>
				</Link>

				{/* Desktop Navigation */}
				<div className="hidden lg:flex items-center gap-1 bg-gray-50/80 border border-gray-100 p-1.5 rounded-full">
					{links.map((link) => {
						const isActive = link.hash
							? location.pathname === link.path && location.hash === link.hash
							: location.pathname === link.path && !location.hash;
						return (
							<Link
								key={`${link.path}${link.hash ?? ''}`}
								className={cn(
									"px-4 xl:px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200",
									isActive 
										? "bg-[#2e5da0]/15 text-[#2e5da0]" 
										: "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
								)}
								to={{ pathname: link.path, hash: link.hash }}
							>
								{link.name}
							</Link>
						);
					})}
				</div>

				{/* Right Section (Lang + CTA) */}
				<div className="flex items-center gap-2 pr-1">
					{/* Language Toggle */}
					<div className="flex items-center bg-gray-50/80 border border-gray-100 rounded-full p-1">
						<button 
							onClick={() => handleLangChange('EN')}
							className={cn(
								"px-2.5 py-1.5 text-[11px] sm:text-xs font-bold rounded-full transition-all duration-200",
								lang === 'EN' ? "bg-white shadow-sm text-[#2e5da0]" : "text-gray-500 hover:text-gray-700"
							)}
						>
							EN
						</button>
						<button 
							onClick={() => handleLangChange('FR')}
							className={cn(
								"px-2.5 py-1.5 text-[11px] sm:text-xs font-bold rounded-full transition-all duration-200",
								lang === 'FR' ? "bg-white shadow-sm text-[#2e5da0]" : "text-gray-500 hover:text-gray-700"
							)}
						>
							FR
						</button>
					</div>

					{/* CTA Button */}
					<Link 
						to="/contact" 
						className="hidden sm:inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#4278c4] to-[#2e5da0] text-white whitespace-nowrap px-5 xl:px-6 py-2.5 text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105"
					>
						{t('nav.getQuote')}
						<ArrowRight className="w-4 h-4" />
					</Link>

					{/* Mobile Menu Toggle */}
					<Sheet open={open} onOpenChange={setOpen}>
						<Button
							size="icon"
							variant="outline"
							onClick={() => setOpen(!open)}
							className="lg:hidden rounded-full"
						>
							<MenuIcon className="size-5" />
						</Button>
						<SheetContent
							className="bg-white/95 supports-[backdrop-filter]:bg-white/90 gap-0 backdrop-blur-lg"
							showClose={false}
							side="left"
						>
							<div className="grid gap-y-2 overflow-y-auto px-4 pt-12 pb-5">
								{links.map((link) => (
									<Link
										key={`${link.path}${link.hash ?? ''}`}
										className={cn(
											buttonVariants({
												variant: 'ghost',
												className: 'justify-start text-lg py-6 rounded-xl',
											}),
											(link.hash
												? location.pathname === link.path && location.hash === link.hash
												: location.pathname === link.path && !location.hash)
													? 'bg-[#2e5da0]/10 text-[#2e5da0] font-bold'
													: 'text-gray-600 font-medium'
										)}
										to={{ pathname: link.path, hash: link.hash }}
										onClick={() => setOpen(false)}
									>
										{link.name}
									</Link>
								))}
							</div>
							<SheetFooter className="mt-auto p-4 flex flex-col gap-4">
								<div className="flex items-center justify-center bg-gray-100 rounded-xl p-1 w-full">
									<button 
										onClick={() => handleLangChange('EN')}
										className={cn(
											"flex-1 py-3 text-sm font-bold rounded-lg transition-colors",
											lang === 'EN' ? "bg-white shadow-sm text-[#2e5da0]" : "text-gray-500 hover:text-gray-700"
										)}
									>
										{t('nav.english')}
									</button>
									<button 
										onClick={() => handleLangChange('FR')}
										className={cn(
											"flex-1 py-3 text-sm font-bold rounded-lg transition-colors",
											lang === 'FR' ? "bg-white shadow-sm text-[#2e5da0]" : "text-gray-500 hover:text-gray-700"
										)}
									>
										{t('nav.french')}
									</button>
								</div>
								<Link 
									to="/contact" 
									onClick={() => setOpen(false)} 
									className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4278c4] to-[#2e5da0] text-white px-6 py-4 text-lg font-bold shadow-md"
								>
									{t('nav.getFreeQuote')}
									<ArrowRight className="w-5 h-5" />
								</Link>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</header>
	);
}
