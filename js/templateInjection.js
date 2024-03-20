// ------------------- Variables & Nodes -------------------

const mainContainer = document.querySelector('main > .container');
const sideBarContainer = document.querySelector('[data-sidebar]');
const headerTemplate = `
				<!-- Start eBay Header -->
				<div class="d-flex justify-content-between align-items-center mb-3">
					<h1 class="fw-bold m-0 h3">My eBay</h1>
					<a href="#" class="fs-7 text-decoration-underline">Tell us what you think</a>
				</div>
				<!-- Start Navigation Buttons -->
				<div class="border-bottom d-flex justify-content-between align-items-center">
					<!-- Buttons -->
					<ul
						class="d-flex gap-5 col-12 col-md-5 justify-content-center justify-content-md-start align-items-center ebay-navi-btns list-unstyled mb-1"
					>
						<li><a href="#" class="active">Activity</a></li>
						<li><a href="#">Messages</a></li>
						<li><a href="#">Account</a></li>
					</ul>
					<!-- User Details  -->
					<div class="d-none d-md-block">
						<a href="#">User Name</a>
						<span>(<a href="#"> 0 </a> )</span>
						<button type="button" class="" data-bookmark-btn>
							<i class="bi bi-bookmark" data-bookmark-icon></i>
						</button>
					</div>
				</div>
`;

const sideBarTemplate = `
					<!-- Start Navigation  -->
					<div class="col-3 col-xl-2">
						<nav class="navbar navbar-expand-md">
							<!-- Start Navigation Button -->
							<button
								class="navbar-toggler"
								type="button"
								data-bs-toggle="offcanvas"
								data-bs-target="#navbarSupportedContent"
							>
								<span class="navbar-toggler-icon"></span>
							</button>
							<!-- Start Navigation Body -->
							<div
								class="offcanvas offcanvas-start w-50 overflow-y-scroll"
								tabindex="-1"
								id="navbarSupportedContent"
							>
								<!-- Close Button -->
								<div class="offcanvas-header">
									<button
										type="button"
										class="btn-close start-0"
										data-bs-dismiss="offcanvas"
									></button>
								</div>
								<!-- Start List -->
								<ul class="nav flex-column navigation-list">
									<li class="nav-item active">
										<a class="nav-link text-body fw-bold" href="#">Summary</a>
									</li>
									<li class="nav-item">
										<a class="nav-link text-body fw-bold" href="#">Recently viewed</a>
									</li>
									<li class="nav-item">
										<a class="nav-link text-body fw-bold" href="#">Bids &amp; offers</a>
									</li>
									<li class="nav-item">
										<a class="nav-link text-body fw-bold" href="#">Purchases</a>
									</li>
									<li class="nav-item">
										<a class="nav-link text-body fw-bold" href="#">Watchlist</a>
									</li>
									<li class="nav-item">
										<a class="nav-link text-body fw-bold" href="#">Saved searches</a>
									</li>
									<li class="nav-item">
										<a class="nav-link text-body fw-bold" href="#">Saved sellers</a>
									</li>
									<li class="nav-item">
										<a class="nav-link text-body fw-bold" href="#">My Garage</a>
									</li>
									<li class="nav-item">
										<div class="accordion accordion-flush w-100" id="accordionExample">
											<div class="accordion-item">
												<p class="accordion-header">
													<button
														class="accordion-button collapsed px-3 py-2 fw-bold"
														type="button"
														data-bs-toggle="collapse"
														data-bs-target="#collapseThree"
														aria-expanded="false"
														aria-controls="collapseThree"
													>
														Selling
													</button>
												</p>
												<div
													id="collapseThree"
													class="accordion-collapse collapse"
													data-bs-parent="#accordionExample"
												>
													<ul class="accordion-body list-unstyled">
														<li class="p-2">
															<a href="#" class="fs-7 text-secondary">Overview</a>
														</li>
														<li class="p-2">
															<a href="#" class="fs-7 text-secondary">Sell an item</a>
														</li>
														<li class="p-2">
															<a href="#" class="fs-7 text-secondary">Drafts</a>
														</li>
														<li class="p-2">
															<a href="#" class="fs-7 text-secondary">Scheduled</a>
														</li>
														<li class="p-2">
															<a href="#" class="fs-7 text-secondary">Active</a>
														</li>
														<li class="p-2">
															<a href="#" class="fs-7 text-secondary">Sold</a>
														</li>
														<li class="p-2">
															<a href="#" class="fs-7 text-secondary">Unsold</a>
														</li>
														<li class="p-2">
															<a href="#" class="fs-7 text-secondary">Payments</a>
														</li>
														<li class="p-2">
															<a href="#" class="fs-7 text-secondary">Shipping labels</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</li>
									<li class="nav-item">
										<a class="nav-link text-body fw-bold" href="#">Collection beta</a>
									</li>
									<li class="nav-item">
										<a class="nav-link text-body fw-bold" href="#">The eBay vault</a>
									</li>
								</ul>
							</div>
						</nav>
					</div>
`;

// ------------------- Functions ---------------------------

// ------------------- Event Listeners ---------------------
mainContainer.insertAdjacentHTML('afterbegin', headerTemplate);
sideBarContainer.insertAdjacentHTML('afterbegin', sideBarTemplate);
