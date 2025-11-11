const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-700 py-10">
            <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-8">

                {/* About */}
                <div>
                    <h6 className="font-bold text-lg mb-4">CareerConnect</h6>
                    <p className="text-sm text-gray-600">
                        Connecting job seekers with their dream jobs. Stay updated with the latest opportunities and career tips.
                    </p>
                </div>

                {/* Jobs */}
                <div>
                    <h6 className="font-semibold text-md mb-4">Jobs</h6>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li><a href="/jobs" className="hover:text-blue-600">Browse Jobs</a></li>
                        <li><a href="/jobs?type=fulltime" className="hover:text-blue-600">Full-Time</a></li>
                        <li><a href="/jobs?type=parttime" className="hover:text-blue-600">Part-Time</a></li>
                        <li><a href="/jobs?type=remote" className="hover:text-blue-600">Remote Jobs</a></li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h6 className="font-semibold text-md mb-4">Company</h6>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li><a href="/about" className="hover:text-blue-600">About Us</a></li>
                        <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
                        <li><a href="/careers" className="hover:text-blue-600">Careers</a></li>
                        <li><a href="/blog" className="hover:text-blue-600">Blog</a></li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h6 className="font-semibold text-md mb-4">Follow Us</h6>
                    <div className="flex space-x-4">
                        {/* Twitter */}
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557a9.9 9.9 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.38 4.482A13.944 13.944 0 0 1 1.671 3.149 4.916 4.916 0 0 0 3.195 9.72 4.903 4.903 0 0 1 .964 9.1v.062a4.916 4.916 0 0 0 3.946 4.827 4.902 4.902 0 0 1-2.212.084 4.917 4.917 0 0 0 4.588 3.414 9.867 9.867 0 0 1-6.102 2.104c-.396 0-.788-.023-1.175-.068a13.945 13.945 0 0 0 7.548 2.212c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0 0 24 4.557z" />
                            </svg>
                        </a>

                        {/* YouTube */}
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a2.998 2.998 0 0 0-2.116-2.12C19.644 3.5 12 3.5 12 3.5s-7.644 0-9.382.566A2.998 2.998 0 0 0 .502 6.186 31.477 31.477 0 0 0 0 12a31.477 31.477 0 0 0 .502 5.814 2.998 2.998 0 0 0 2.116 2.12C4.356 20.5 12 20.5 12 20.5s7.644 0 9.382-.566a2.998 2.998 0 0 0 2.116-2.12A31.477 31.477 0 0 0 24 12a31.477 31.477 0 0 0-.502-5.814zM9.75 15.02V8.98l6 3.02-6 3.02z" />
                            </svg>
                        </a>

                        {/* Facebook */}
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.333v21.333C0 23.403.597 24 1.325 24H12v-9.333H9.333V12H12V9.333c0-2.667 1.626-4.125 4-4.125 1.15 0 2.133.084 2.418.123v2.808h-1.664c-1.304 0-1.556.621-1.556 1.529V12h3.111l-.405 2.667H15.198V24h7.477c.728 0 1.325-.597 1.325-1.333V1.333C24 .597 23.403 0 22.675 0z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-10 border-t border-gray-300 pt-6 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} CareerConnect. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
