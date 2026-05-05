import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AlertCircle, Package, ShoppingCart, Image, Lock } from 'lucide-react';
import ProductImageUpload from '@/components/admin-view/image-upload';
import { addFeatureImage, getFeatureImages } from '@/store/common-slice';
import { fetchAllProducts } from '@/store/admin/products-slice';
import { useAuth } from '../../context/AuthContext';

function formatLkrPrice(value) {
  const numericValue = Number(value || 0);
  return `LKR ${numericValue.toLocaleString()}`;
}

function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [activeTab, setActiveTab] = useState('products');

  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { productList } = useSelector((state) => state.adminProducts);
  const totalProducts = productList?.length || 0;
  const totalFeatureImages = featureImageList?.length || 0;

  // Authentication and authorization check
  useEffect(() => {
    if (authLoading) {
      setIsLoading(true);
      return;
    }

    if (!user) {
      navigate('/auth/login', { replace: true });
      return;
    }

    if (user.role !== 'admin') {
      navigate('/', { replace: true });
      return;
    }

    setIsLoading(false);
  }, [authLoading, navigate, user]);

  // Load feature images and products on mount
  useEffect(() => {
    if (user?.role === 'admin') {
      dispatch(getFeatureImages());
      dispatch(fetchAllProducts());
    }
  }, [dispatch, user]);

  // Handle feature image upload
  const handleUploadFeatureImage = () => {
    if (!uploadedImageUrl.trim()) {
      alert('Please enter an image URL');
      return;
    }
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl('');
        alert('Feature image uploaded successfully');
      } else {
        alert('Failed to upload feature image');
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 px-6 py-4 text-zinc-200 shadow-2xl shadow-black/40 backdrop-blur">
          Loading admin dashboard...
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-zinc-950 via-zinc-900 to-black px-4">
        <div className="max-w-md rounded-3xl border border-red-900/50 bg-zinc-900/90 p-8 text-center shadow-2xl shadow-black/50 backdrop-blur">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-900/50 bg-red-950/40 text-red-300">
            <Lock size={30} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-50">Access Denied</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            You do not have permission to access the admin dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_30%),linear-gradient(180deg,_#09090b_0%,_#111113_40%,_#050505_100%)] p-4 sm:p-6 lg:p-8 text-zinc-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-zinc-400">
                Admin Console
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Admin Dashboard
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
                Welcome back, <span className="font-medium text-zinc-100">{user?.userName || user?.email}</span>. Manage products, track orders,
                and curate feature content from one dark, focused workspace.
              </p>
            </div>

            <div className="grid w-full max-w-xl grid-cols-2 gap-3 sm:grid-cols-4 lg:max-w-2xl">
              <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-4 shadow-lg shadow-black/20">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Products</p>
                <p className="mt-2 text-2xl font-semibold text-white">{totalProducts}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-4 shadow-lg shadow-black/20">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Features</p>
                <p className="mt-2 text-2xl font-semibold text-white">{totalFeatureImages}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-4 shadow-lg shadow-black/20">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Orders</p>
                <p className="mt-2 text-2xl font-semibold text-white">0</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-4 shadow-lg shadow-black/20">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Role</p>
                <p className="mt-2 text-2xl font-semibold capitalize text-white">{user?.role}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/20 backdrop-blur-xl">
          <div>
            <p className="text-sm font-medium text-white">Navigation</p>
            <p className="text-xs text-zinc-400">Use these links to move back to the storefront or auth pages.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10"
            >
              Home
            </Link>
            <Link
              to="/shop/home"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10"
            >
              Shop
            </Link>
            <Link
              to="/admin/products"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10"
            >
              Products
            </Link>
            <Link
              to="/auth/login"
              className="rounded-xl border border-white/10 bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
            >
              Switch Account
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-2 shadow-xl shadow-black/30 backdrop-blur-xl">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {[
              { key: 'products', label: 'Products', icon: Package },
              { key: 'orders', label: 'Orders', icon: ShoppingCart },
              { key: 'features', label: 'Feature Images', icon: Image },
            ].map(({ key, label, icon: Icon }) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-zinc-100 text-zinc-950 shadow-lg shadow-black/20'
                      : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === 'products' && (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-3xl border border-white/10 bg-zinc-900/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="flex items-start gap-3 rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-green-100">
                <AlertCircle className="mt-0.5 flex-shrink-0 text-green-400" size={20} />
                <div>
                  <p className="text-sm font-medium">Backend API Connected</p>
                  <p className="mt-1 text-sm text-green-100/80">
                    Full product CRUD integration is active. Current catalog count: <strong>{totalProducts}</strong> products loaded from database.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Current Products</h2>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-zinc-400">
                  Live view
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {productList && productList.length > 0 ? (
                  productList.map((product, index) => (
                    <div
                      key={product.id || index}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/8"
                    >
                      <div>
                        <p className="font-medium text-white">{product.title}</p>
                          <p className="mt-1 text-sm text-zinc-400">Price: {formatLkrPrice(product.price)}</p>
                      </div>
                      <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-sm text-zinc-300">
                        Stock: {product.totalStock}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 py-12 text-center text-zinc-400">
                    No products found
                  </div>
                )}
              </div>
            </section>

            <aside className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-white">Catalog Health</h3>
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Items visible</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{totalProducts}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Back-end status</p>
                  <p className="mt-2 text-sm font-medium text-green-400">✓ Connected & Operational</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Theme</p>
                  <p className="mt-2 text-sm text-zinc-300">Dark console with high-contrast surfaces</p>
                </div>
              </div>
            </aside>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <section className="rounded-3xl border border-white/10 bg-zinc-900/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-amber-100">
                <AlertCircle className="mt-0.5 flex-shrink-0 text-amber-300" size={20} />
                <div>
                  <p className="text-sm font-medium">Backend API Required</p>
                  <p className="mt-1 text-sm text-amber-100/80">
                    Order management will become interactive when the backend endpoints are connected.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Orders Management</h2>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-zinc-400">
                  Queue empty
                </span>
              </div>

              <div className="mt-5 rounded-3xl border border-dashed border-white/15 bg-white/5 py-16 text-center">
                <ShoppingCart size={52} className="mx-auto text-zinc-500" />
                <p className="mt-4 text-lg font-medium text-white">No orders to display</p>
                <p className="mt-2 text-sm text-zinc-400">Awaiting backend implementation</p>
              </div>
            </section>

            <aside className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-white">Operations</h3>
              <div className="mt-5 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Status</p>
                  <p className="mt-2 text-sm text-zinc-300">Manual review mode</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Workflow</p>
                  <p className="mt-2 text-sm text-zinc-300">Waiting for order API hooks</p>
                </div>
              </div>
            </aside>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <section className="rounded-3xl border border-white/10 bg-zinc-900/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">Feature Images</h2>
                  <p className="mt-1 text-sm text-zinc-400">Upload and manage hero imagery for the storefront.</p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-zinc-400">
                  {totalFeatureImages} uploaded
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
                <h3 className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-zinc-400">
                  Upload New Feature Image
                </h3>
                <ProductImageUpload
                  imageFile={imageFile}
                  setImageFile={setImageFile}
                  uploadedImageUrl={uploadedImageUrl}
                  setUploadedImageUrl={setUploadedImageUrl}
                  setImageLoadingState={setImageLoadingState}
                  imageLoadingState={imageLoadingState}
                  isCustomStyling={true}
                />
                <button
                  onClick={handleUploadFeatureImage}
                  disabled={imageLoadingState || !uploadedImageUrl}
                  className="mt-4 w-full rounded-xl bg-zinc-100 px-4 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Upload Feature Image
                </button>
              </div>
            </section>

            <aside className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Uploaded Images</h3>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-zinc-400">
                  Gallery
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {featureImageList && featureImageList.length > 0 ? (
                  featureImageList.map((item, index) => (
                    <div key={index} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                      <img src={item.image} alt={`Feature ${index + 1}`} className="h-52 w-full object-cover" />
                      <div className="flex items-center justify-between px-4 py-3 text-xs text-zinc-400">
                        <span>Image {index + 1}</span>
                        <span className="rounded-full border border-white/10 bg-black/20 px-2 py-1">Live</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 py-12 text-center">
                    <Image size={40} className="mx-auto text-zinc-500" />
                    <p className="mt-3 text-sm text-zinc-400">No feature images uploaded yet</p>
                  </div>
                )}
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;