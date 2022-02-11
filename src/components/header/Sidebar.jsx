import React from 'react';
import closeIcon from '../../images/icons/close.svg';
import HomeIcon from '../../images/icons/home.svg';
import courseIcon from '../../images/icons/course.svg';
import assignmentIcon from '../../images/icons/assignment.svg';
import profileIcon from '../../images/icons/profile.svg';

function Sidebar({ openSidebar, setOpenSidebar }) {
	let asideClasses = `absolute top-0 right-0 w-3/12  ${
		openSidebar ? 'transform translate-x-0' : 'transform translate-x-full'
	} h-screen bg-white py-3 px-16 drop-shadow-lg transition ease-out duration-500`;

	const closeSidebarHandler = () => {
		setOpenSidebar(!openSidebar);
	};
	const sideNav = [
		{
			name: 'Home',
			icon: HomeIcon,
		},
		{
			name: 'My Courses',
			icon: courseIcon,
		},
		{
			name: 'My Assignments',
			icon: assignmentIcon,
		},
		{
			name: 'My Profile',
			icon: profileIcon,
		},
	];

	return (
		<aside className={asideClasses}>
			<ul className="flex flex-col items-start gap-10">
				<li className="self-end cursor-pointer">
					<img
						src={closeIcon}
						alt="close-icon"
						className="w-12 cursor-pointer hover:rotate-180 transition-all"
						onClick={closeSidebarHandler}
					/>
				</li>
				{React.Children.toArray(
					sideNav.map(sidenav => {
						return (
							<li className="flex items-center gap-2 hover:translate-x-2 transition-all">
								<img src={sidenav.icon} alt="icon" className="w-5" />
								<a href="#" className="text-lg">
									{sidenav.name}
								</a>
							</li>
						);
					}),
				)}
			</ul>
		</aside>
	);
}

export default Sidebar;
